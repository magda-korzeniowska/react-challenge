![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) ![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white) ![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white) ![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

# Home Budget Management App

#### Project created as part of _Dare IT Portfolio Challenge_ - Frontend Development (React) Path

This is a React web application for managing your home budget - it allows you to define budgets for individual types of expenses, track the level of spending, and thus the current state of home finances.

![Budget Page ](/client/src/assets/budget_page.png)
![Wallet Page ](/client/src/assets/wallet_page.png)

## Table of Contents

- [About Project](#about-project)
- [Acquired Skills](#acquired-skills)
- [Project Status](#project-status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Sources](#sources)
- [Contributing](#contributing)

## About Project

The project was created as part of [Dare IT Portfolio Challenge](https://www.dareit.io) - a 3-month program prepared by mentors from the Dare IT community together with Flying Bisons IT company and in collaboration with Stanford University from Silicon Valley.

The aim of the project was to improve practical skills in React.js, learn new technologies and good practices, and at the same time to expand the portfolio with the support of experts from the IT industry.

At the beginning of the project, the participants received a starter pack with a base repository, which was individually expanded based on the received acceptance criteria and design in Figma.

The application was programmed in React.js 17.0 using Material UI, react-query, react-hook-form, react-chartjs-2, Notistack, Storybook, Cypress.

## Acquired Skills

For the first time I had an opportunity to test Storybook in practice - it allows to create and test components in isolation => it runs outside of the app, so project dependencies do not affect the behaviour of components. So helpful!

I also found out how simple, fast and fun it can be to fetch data with react-query - a great hook library for managing data requests that completely eliminates the need to put remote data inside the global state!

Thanks to react-chartjs-2 I've created my very first chart in React and found out that data visualization doesn't need to be difficult.

Last, but not least - Material UI - a component library which by allowing to "drag and drop" elements to build UI and customize components makes developers' work so much faster and easier.

## Project Status

The Dare IT Portfolio Challenge is completed, but the project is still under development.
Planned features:

- mobile version
- search bar for expenses
- filter expenses by type
- editing
- alert when budget is exceeded
- ...

## Installation

1. Start terminal and clone repository using:
   ```bash
   git clone https://github.com/magda-korzeniowska/react-challenge.git`
   ```
2. Install all dependencies => go the main directory of the react-challenge repository:

   ```bash
   cd react-challenge
   ```

   and run:

   ```bash
   npm install
   ```

3. Run application:

   ```bash
   npm start
   ```

   This command will start simultaneously 2 applications (the client application and the server application) that will be available at the following addresses:

   - client - react app - http://localhost:3000
   - server - backend app - http://localhost:4320
     - API documentation is available at http://localhost:4320/swagger

## Dependencies

- [Material UI](https://mui.com)
- [react-query](https://react-query.tanstack.com)
- [react-hook-form](https://react-hook-form.com)
- [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [notistack](https://iamhosseindhv.com/notistack)
- [cypress](https://www.cypress.io)
- [storybook](https://storybook.js.org)
- [prop-types](https://www.npmjs.com/package/prop-types)

## Sources

- icons: [Material Icons](https://mui.com/components/material-icons/)

## Contributing

This is a Dare IT Portfolio Challenge project. Therefore, no pull requests will be accepted.
