import { NextRequest } from "next/server";
import { getDate } from "@/components/ui/helpers/get-date";
import { STRAPI_HOST, STRAPI_TOKEN } from "../../constants";
import { cache } from "react";

interface StrapiQOTDResponse {
  data: {
    id: number;
    attributes: {
      updatedAt: Date;
      ActiveId: number | null;
      LastRenewed: Date | null;
      Prompt: {
        id: number;
        __component: string;
        Question: string;
        Option: {
          id: number;
          Value: string;
          Answer: boolean | null;
        }[];
      }[];
    };
  };
}

export interface QOTD {
  id: number;
  question: string;
  options: {
    id: number;
    value: string;
  }[];
}

export async function GET(request: NextRequest) {
  const response = await fetch(`${STRAPI_HOST}/api/qotd?populate[Prompt][populate]=*`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    // i *think* this isn't properly revalidated in some cases
    next: { revalidate: 3600 },
  });
  const questions = (await response.json()) as StrapiQOTDResponse;
  const submission = request.nextUrl.searchParams.get("submission");
  if (questions.data.attributes.ActiveId) {
    const currentDate = getDate(new Date());
    let activeQuestion;
    // get a new question if the date is different
    const renewedDate = questions.data.attributes.LastRenewed;
    console.log(currentDate, renewedDate && getDate(new Date(renewedDate)));
    if (!renewedDate || currentDate !== getDate(new Date(renewedDate))) {
      activeQuestion = await getNewQuestion(questions);
    } else {
      activeQuestion = questions.data.attributes.Prompt.find(
        (prompt) => prompt.id === questions.data.attributes.ActiveId
      );
    }

    if (!activeQuestion) return Response.json({ error: "Active question not found" }, { status: 500 });
    if (submission) {
      const submissionId = Number(submission);
      const correct = activeQuestion.Option.find((option) => option.id === submissionId)?.Answer;
      return Response.json({ correct: correct ?? false });
    }

    const structured = structureQuestion(activeQuestion);
    return Response.json(structured);
  }

  const newQuestion = await getNewQuestion(questions);
  if (submission) {
    const submissionId = Number(submission);
    const correct = newQuestion.Option.find((option) => option.id === submissionId)?.Answer;
    return Response.json({ correct: correct ?? false });
  }

  const structured = structureQuestion(newQuestion);
  return Response.json(structured);
}

async function getNewQuestion(questions: StrapiQOTDResponse) {
  const randomQuestion =
    questions.data.attributes.Prompt[Math.floor(Math.random() * questions.data.attributes.Prompt.length)];
  const updateBody = {
    data: {
      ActiveId: randomQuestion.id,
      LastRenewed: new Date().toISOString(),
    },
  };

  await fetch(`${STRAPI_HOST}/api/qotd`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(updateBody),
  });

  return randomQuestion;
}

function structureQuestion(question: StrapiQOTDResponse["data"]["attributes"]["Prompt"][0]): QOTD {
  return {
    id: question.id,
    question: question.Question,
    options: question.Option.map((option) => ({
      id: option.id,
      value: option.Value,
    })),
  };
}
