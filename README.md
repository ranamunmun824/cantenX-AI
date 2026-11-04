# 🍽️ CanteenX AI

### Skip the Queue. Not Your Meal.

**An AI-powered Smart Campus Canteen Platform designed to revolutionize campus dining through intelligent food ordering, virtual queue management and personalized AI recommendations.**

<p align="center">
  <img src="https://img.shields.io/badge/Project-Generative%20AI-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cloud-AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/AI-Amazon%20Bedrock-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Prototype-success?style=for-the-badge" />
</p>

---

## 🚀 Overview

College canteens are often associated with long queues, limited lunch breaks, uncertain food availability and inefficient order management.

Students waste valuable time standing in queues, while canteen administrators struggle to manage incoming orders, inventory and peak-hour demand.

**CanteenX AI** aims to transform traditional college canteens into smart, efficient and AI-powered dining environments.

It provides students with a digital food ordering experience, virtual queue management, digital tokens and intelligent food recommendations.

For canteen administrators, it introduces streamlined order management, inventory monitoring, sales analytics and AI-driven demand insights.

Our vision is simple:

**Make campus dining faster, smarter and more accessible.**

---

## 🎯 The Problem We're Solving

Traditional college canteens face several challenges:

* 🕒 **Long Queues:** Students spend a significant portion of their lunch breaks waiting.
* 📋 **Menu Uncertainty:** Students often don't know what is available until they reach the counter.
* ❌ **Food Availability:** Popular food items may sell out unexpectedly.
* 🍔 **Inefficient Ordering:** Manual ordering creates unnecessary congestion.
* 📦 **Inventory Challenges:** Canteen staff struggle to predict food demand.
* ♻️ **Food Wastage:** Poor demand estimation can result in unnecessary food preparation.

CanteenX AI addresses these challenges through a unified digital platform.

---

## ✨ Key Features

### 👨‍🎓 Student Experience

| Feature           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| Digital Menu      | Explore food items, prices, categories and availability. |
| Smart Food Search | Find meals based on preferences and budget.              |
| Virtual Queue     | Avoid physically standing in long queues.                |
| Digital Tokens    | Receive a unique token after placing an order.           |
| Pre-Ordering      | Order food before reaching the canteen.                  |
| Order Tracking    | Track order preparation and pickup status.               |
| Crowd Indicator   | View the estimated canteen crowd level.                  |
| AI Food Assistant | Discover meals through natural-language interaction.     |
| Order History     | Access previous orders and food selections.              |

### 🤖 AI-Powered Intelligence

CanteenX AI is designed to use Amazon Bedrock and Amazon PartyRock for intelligent campus dining workflows.

Planned AI capabilities include:

* **AI Food Recommendations:** Personalized food suggestions based on budget, preferences and availability.
* **Budget-Based Suggestions:** Find affordable meals using natural-language queries.
* **AI Canteen Assistant:** Ask questions about menus, prices and available food.
* **Demand Forecasting:** Analyze historical orders to estimate future food demand.
* **Food Wastage Insights:** Identify potential excess food preparation.
* **AI Admin Assistant:** Generate understandable insights from canteen activity.

### 🏪 Canteen Administration

| Feature            | Description                             |
| ------------------ | --------------------------------------- |
| Admin Dashboard    | View canteen performance and activity.  |
| Order Management   | Manage incoming and completed orders.   |
| Menu Management    | Add, edit and remove food items.        |
| Inventory Tracking | Monitor food availability and stock.    |
| Sales Analytics    | Understand daily and historical sales.  |
| Peak-Hour Analysis | Identify busy canteen periods.          |
| Demand Insights    | Make better food preparation decisions. |

---

## 🧠 How CanteenX AI Works

### Student Workflow

1. Student opens the CanteenX AI website.
2. Explores the digital food menu.
3. Checks food availability and prices.
4. Uses the AI assistant to discover suitable meals.
5. Adds food to the shopping cart.
6. Places an order.
7. Receives a digital token.
8. Tracks queue position and order progress.
9. Collects food when the order is ready.

### Administrator Workflow

1. Administrator accesses the dashboard.
2. Views incoming orders.
3. Updates preparation and pickup status.
4. Manages the digital menu.
5. Monitors inventory.
6. Reviews sales and order analytics.
7. Uses AI-powered insights to understand demand and reduce wastage.

---

## 🏗️ Technology Stack

The project uses a modern frontend architecture, with AWS and generative AI integrations planned as the application evolves.

| Technology        | Purpose                           |
| ----------------- | --------------------------------- |
| React.js          | Frontend development              |
| TypeScript        | Type-safe development             |
| Vite              | Frontend build tooling            |
| Tailwind CSS      | Styling and responsive design     |
| shadcn/ui         | Reusable UI components            |
| Lucide React      | Icons                             |
| Recharts          | Analytics and visualizations      |
| LocalStorage      | Prototype data persistence        |
| Amazon Bedrock    | Planned generative AI integration |
| Amazon Nova       | Planned foundation model          |
| Amazon PartyRock  | Planned AI workflow development   |
| AWS Lambda        | Planned serverless backend        |
| Amazon DynamoDB   | Planned cloud database            |
| Amazon Cognito    | Planned authentication            |
| Amazon S3         | Planned asset storage             |
| Amazon CloudFront | Planned frontend delivery         |

---

## ☁️ Proposed AWS Architecture

CanteenX AI is designed with a scalable AWS architecture.

```text
              STUDENTS / ADMIN
                     |
                     v
              CANTEENX AI
                 WEBSITE
                     |
                     v
              Amazon CloudFront
                     |
                     v
                Amazon S3
                     |
                     v
               API Gateway
                     |
                     v
                AWS Lambda
                     |
          +----------+----------+
          |          |          |
          v          v          v
       DynamoDB   Bedrock    Amazon SQS
                     |          |
                     v          v
                 AI Services  Lambda
                                |
                                v
                            Amazon SNS
                                |
                                v
                           Notifications
```

### AWS Services and Their Roles

* **Amazon Bedrock:** Generative AI assistant, recommendations and intelligent insights.
* **Amazon Nova:** Foundation model for AI-powered conversations.
* **AWS Lambda:** Serverless business logic.
* **Amazon API Gateway:** Backend API management.
* **Amazon DynamoDB:** Orders, menu, inventory and user data.
* **Amazon Cognito:** Authentication and user management.
* **Amazon S3:** Food images and static website assets.
* **Amazon CloudFront:** Content delivery.
* **Amazon SQS:** Asynchronous order processing.
* **Amazon SNS:** Notifications.
* **Amazon CloudWatch:** Application monitoring.

*Note: This represents the proposed architecture. AWS integrations will be implemented and enabled as the project progresses.*

---

## 🎨 Application Modules

CanteenX AI is organized into four primary modules:

### 1. Public Website

Introduces the platform, its capabilities and its benefits.

### 2. Student Portal

Provides digital menus, ordering, cart management, queue tracking and AI food assistance.

### 3. Admin Dashboard

Provides order management, menu administration, inventory tracking and business analytics.

### 4. AI Intelligence Center

Designed for demand forecasting, food wastage analysis, intelligent recommendations and AI-generated administrative insights.

---

## 📸 Screenshots

Screenshots of the application will be added as development progresses.

Suggested screenshots:

* Landing Page
* Student Dashboard
* Digital Food Menu
* AI Food Assistant
* Digital Token and Order Tracking
* Admin Dashboard
* Inventory Management
* Analytics Dashboard
* AI Intelligence Center

---

## 💻 Local Development

### Prerequisites

* Node.js (LTS)
* npm
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CanteenX-AI.git
```

### 2. Navigate to the Project

```bash
cd CanteenX-AI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

```text
http://localhost:5173
```

*Note: These commands assume the frontend is structured as a Vite application. Adjust them if the generated project uses a different setup.*

---

## 🧪 Demo Environment

CanteenX AI initially operates using simulated college canteen data.

The demonstration environment is designed to include:

* Sample students and administrators.
* Simulated food menus.
* Sample food availability.
* Simulated orders.
* Digital token generation.
* Order tracking.
* Sample inventory.
* Historical sales analytics.

**Important:** Simulated transactions do not involve real payments or actual canteen operations.

AI assistant responses in the initial frontend prototype may use predefined sample responses until the PartyRock or Bedrock workflow is connected.

---

## 🗺️ Development Roadmap

### Phase 1 — Frontend Development

* [x] Project concept and architecture.
* [x] Feature planning.
* [ ] Responsive landing page.
* [ ] Student dashboard.
* [ ] Digital menu.
* [ ] Shopping cart and checkout.
* [ ] Digital token interface.
* [ ] Order tracking interface.
* [ ] Admin dashboard.
* [ ] Inventory management.
* [ ] Analytics dashboard.

### Phase 2 — AI Integration

* [ ] Canteen AI Assistant.
* [ ] Budget-based food recommendations.
* [ ] AI menu understanding.
* [ ] AI administrative insights.
* [ ] Amazon PartyRock workflows.
* [ ] Amazon Bedrock integration.

### Phase 3 — AWS Integration

* [ ] Backend API development.
* [ ] DynamoDB integration.
* [ ] AWS Lambda integration.
* [ ] Amazon Cognito authentication.
* [ ] Real-time queue management.
* [ ] Notification system.
* [ ] AWS deployment.

### Phase 4 — Intelligence and Scalability

* [ ] Demand forecasting.
* [ ] Food wastage analysis.
* [ ] Advanced inventory recommendations.
* [ ] Multi-college support.
* [ ] Real-world college deployment.

---

## 🌍 Future Vision

CanteenX AI is designed to grow beyond a single college canteen.

Our long-term vision is to develop a scalable smart campus dining ecosystem that can serve multiple educational institutions.

Potential future capabilities:

* Multi-college onboarding.
* Multiple canteen management.
* Real-time kitchen integration.
* Actual online payments.
* Personalized meal recommendations.
* Advanced predictive analytics.
* Food demand optimization.
* Sustainable food management.

The ultimate objective is to make intelligent campus dining accessible to educational institutions.

---

## 🌱 Social Impact

CanteenX AI aims to contribute to a better campus experience.

**For Students:** Less waiting, easier ordering and better food discovery.

**For Canteen Staff:** Better order organization and inventory visibility.

**For Institutions:** More efficient canteen operations.

**For Sustainability:** Better demand estimation and reduced potential food wastage.

We believe technology should solve everyday problems, and CanteenX AI is an attempt to make a simple but meaningful improvement in student life.

---

## 🤝 Contributing

Contributions, suggestions and improvements are welcome!

To contribute:

1. Fork this repository.
2. Create a new feature branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add: your feature"
git push origin feature/your-feature
```

---

## 👩‍💻 Project Vision

**CanteenX AI — Skip the Queue. Not Your Meal.**

Building smarter campuses, one meal at a time. 🍽️

---

## 📄 License

This project is intended for educational, innovation and hackathon purposes.

A license will be added to the repository as the project progresses.
