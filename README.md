# daybreak

> Academic information centre with personal progress tracking, and fun activities. This project was built specifically for a uni assignment, but open-sourced because it'd be fun.

<table>
   <tr>
   <img src="https://i.imgur.com/9t2Z57H.png" title="Homepage" alt="Homepage">
   </tr> 
  </tr>
  <tr>
   <img src="https://i.imgur.com/YZaaRsg.png" title="Course View (dark mode)" alt="Course View (dark mode)">
   </tr> 
  </tr>
  <tr>
   <img src="https://i.imgur.com/cElSJxu.png" title="Course View (light mode )" alt="Course View(light mode)">
   <p>View of an individual course, sections are displayed on the left and can be navigated through, and also manually checked, when completing sections, the course progress percentage updates. The course view also contains a "question of the day" box, which includes a randomly selected question, displayed to all users.</p>
  </tr>
</table>

## Getting Started

> [!IMPORTANT]  
> This project requires [strapi](https://strapi.io/) to pull course content from. The `strapi` folder contains all the required content-type schemas, which can be imported directly into the strapi instance, consistent with daybreak's API.

1. First, download [git](https://git-scm.com/), used for version control and code consolidation.
2. Clone this repository with [GitHub Desktop](https://desktop.github.com/) or with git itself:

> [!NOTE]
> To clone the repo with git, you need to [generate SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and add them to your GitHub account.

```bash
git clone git@github.com:cykreet/daybreak.git
```

3. Install [Node.Js](https://nodejs.org/en) and [pnpm](https://pnpm.io/installation), pnpm can be install by running the following command in Powershell:

```bash
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

4. Run `pnpm install` in the repository directory to install Node.Js dependencies.
5. Once installed, run `pnpm dev` to run the website in a local development instance.
6. Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Contributors

- [9Quake](https://github.com/9Quake)
- Janco N.
