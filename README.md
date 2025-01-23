# Data Dive Homes

Welcome to the Data Dive Homes project! This is a Next.js application designed to serve as a real estate investing advisor, powered by AI. The application provides users with insights and advice on real estate properties, leveraging a custom AI model named EstateMate.

## How It Works

Data Dive Homes is a web application that uses AI to provide real estate investment advice. The AI, named EstateMate, is powered by a backend service called `Gemini_LLM_Backend`. This backend service handles the AI model's logic and data processing, allowing EstateMate to deliver accurate and insightful property analyses.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository** to your local machine.
2. **Install dependencies** using your preferred package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Project Structure

- **`app/`**: Contains the main application pages and components.
  - **`page.tsx`**: The homepage of the application.
  - **`about/page.tsx`**: The about page providing information about the AI and its capabilities.
  - **`contactUs/page.jsx`**: The contact page where users can reach out for support or inquiries.
  - **`pricing/page.tsx`**: Displays the pricing plans available for users.

- **`components/`**: Reusable components used across the application.
  - **`Contact.jsx`**: A component for the contact form.
  - **`Footer.tsx`**: The footer component displayed on all pages.
  - **`ChatRoom.tsx`**: The chat interface where users interact with EstateMate.

- **`lib/`**: Contains utility functions and configurations.
  - **`prisma.ts`**: Sets up the Prisma client for database interactions.

- **`prisma/`**: Contains the Prisma schema and migration files for database management.

- **`public/`**: Static files such as images and the `robots.txt` file.

- **`styles/`**: Global styles and Tailwind CSS configurations.

## Key Features

- **AI-Powered Real Estate Advice**: EstateMate provides users with insights and advice on real estate properties.
- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Subscription Management**: Integration with Stripe for handling subscriptions and payments.
- **Responsive Design**: The application is designed to be responsive and user-friendly on all devices.

## Technologies Used

- **Next.js**: A React framework for building fast and scalable web applications.
- **Prisma**: An ORM for database management and interactions.
- **Stripe**: For handling payments and subscriptions.
- **Tailwind CSS**: For styling the application with utility-first CSS.

## Deployment

The application can be deployed on platforms like Vercel, which is optimized for Next.js applications. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

We welcome contributions to improve the application. Feel free to open issues or submit pull requests on the GitHub repository.

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact us at [support@datadivehomes.com](mailto:support@datadivehomes.com).

---

Thank you for using Data Dive Homes! We hope you find our AI advisor helpful in your real estate investing journey.
