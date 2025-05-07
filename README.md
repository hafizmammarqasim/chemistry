# Knowledge Carousel - Interactive Q&A Website

A beautiful, interactive website that displays questions and answers with an aesthetically pleasing slider interface.

## Features

- Interactive slider to navigate through questions and answers
- Smooth animations and transitions
- Responsive design for all device sizes
- Card flip effect to reveal answers
- Progress tracking with visual indicators
- Touch/swipe support for mobile devices
- Keyboard navigation support

## Technologies Used

- Node.js and Express for the backend
- EJS (Embedded JavaScript) templating
- Modern CSS with variables and animations
- Vanilla JavaScript for interactions
- Responsive design principles

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/public` - Static assets (CSS, JavaScript, images)
- `/views` - EJS templates
  - `/layout` - Reusable layout components
  - `/partials` - Reusable template parts
- `server.js` - Express server and routes

## Customization

To add or modify questions, edit the `questionsAnswers` array in `server.js`.

## License

All rights reserved.