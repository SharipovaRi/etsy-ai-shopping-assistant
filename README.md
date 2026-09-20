# Etsy AI Shopping Decision Assistant

**Group 10 — Rita Sharipova, Khushi Patel, Anh Ho, Ngan Hang **  

## Live Demo

The Etsy AI Shopping Decision Assistant is deployed as a live web application using Railway.

**Live Website:**  
https://etsy-ai-shopping-assistant-production.up.railway.app/

The deployed version can be opened directly in a web browser. No local installation or API key is required to test the live demo.

---

## What This Prototype Demonstrates

This prototype demonstrates an AI-assisted shopping decision feature for Etsy.

The feature helps shoppers who may otherwise need to manually search and compare many listings based on factors such as price, personalization, delivery time, reviews, product type, and personal preferences.

A shopper enters a natural-language request describing what they are looking for.

For example:

> I need a personalized birthday gift for my mom under $50 that can arrive within two weeks. She likes silver minimalist jewelry.

The application uses the Google Gemini API to interpret the request and extract structured shopping criteria.

The application then searches a dataset of 100 synthetic Etsy-style product listings and identifies relevant candidates.

Gemini compares the strongest candidates and selects three recommendations based on how well they satisfy the shopper's requirements.

The interface displays the recommendations in structured product cards rather than displaying raw AI or JSON output.

Each recommendation can include:

- Product title
- Price
- Rating and review count
- Personalization availability
- Estimated delivery time
- Match level
- Explanation of why the product matches
- Requirements satisfied
- Requirements not satisfied or tradeoffs
- Review themes
- AI-generated review insight
- View Item action

---

## Core AI Interaction

The prototype demonstrates two primary AI interactions.

### 1. Shopping Request Understanding

Gemini converts the shopper's natural-language request into structured criteria such as:

- Recipient
- Occasion
- Maximum budget
- Product category
- Style
- Personalization requirement
- Maximum delivery time
- Interests

If the request is too vague to support meaningful recommendations, the AI can return a clarifying question instead of inventing missing preferences.

### 2. Product Comparison and Recommendation

The application first retrieves relevant products from the structured dataset.

The strongest candidate products are then provided to Gemini for comparison.

Gemini selects three recommendations and provides:

- Match level
- Reason for recommendation
- Requirements met
- Requirements not met
- Review insight

This separates product retrieval from AI reasoning.

---

## How the Prototype Works

The application follows this flow:

```text
Shopper enters natural-language request
                ↓
Gemini extracts structured shopping criteria
                ↓
Application searches structured product dataset
                ↓
Top candidate products are retrieved
                ↓
Gemini compares candidate products
                ↓
Gemini returns selected listing IDs and reasoning
                ↓
Server verifies the selected listing IDs
                ↓
Product facts are retrieved from the dataset
                ↓
Website displays three structured recommendations
```

This architecture allows the AI to perform language understanding and comparison while keeping factual product information grounded in structured data.

---

## Hallucination Mitigation

One of the major AI-specific risks identified for this feature is hallucinated product information.

For example, an LLM could potentially invent or modify:

- Product prices
- Delivery estimates
- Ratings
- Review counts
- Materials
- Colors
- Personalization availability
- Product titles

The prototype reduces this risk by separating **AI reasoning** from **product facts**.

Gemini is allowed to select product listing IDs and explain why those products match the shopper's request.

However, factual product information displayed to the shopper is retrieved directly from the structured product dataset.

The model is specifically instructed not to invent or modify factual product attributes.

The server also verifies that every listing ID returned by Gemini exists in the candidate dataset before displaying the recommendation.

---

## Structured Output

The AI response is not shown to the shopper as raw JSON.

Instead, the application parses the structured response and displays the information through the web interface.

The interface includes:

- Interpreted shopping criteria
- Three recommendation cards
- Match strength
- Product facts
- Recommendation reasoning
- Requirements met
- Product tradeoffs
- Review information

This demonstrates how the AI capability could be integrated into an actual shopping experience rather than functioning only as a chatbot.

---

## Product Data

The prototype uses a synthetic dataset containing **100 Etsy-style product listings**.

The listings were created specifically for this academic proof of concept and are not actual Etsy marketplace listings.

The dataset includes multiple shopping categories such as:

- Jewelry
- Home & Living
- Kitchen & Cooking
- Art & Prints
- Books & Journals
- Pet Gifts
- Gaming & Tech Gifts
- Travel Gifts
- Candles & Self-Care
- Accessories
- Wedding & Couple Gifts
- Keepsake Gifts
- Hobby Gifts

Each listing contains structured attributes including:

- Listing ID
- Product title
- Category
- Subcategory
- Description
- Price
- Personalization availability
- Personalization options
- Style
- Materials
- Colors
- Intended recipients
- Occasions
- Interests
- Estimated delivery days
- Rating
- Review count
- Review themes

A production implementation would replace the synthetic dataset with current marketplace data and production retrieval infrastructure.

---

## View Item

Each recommendation includes a **View Item** action to demonstrate the next step in the shopping journey.

Because the prototype uses synthetic listings, the button does not link to an actual Etsy product.

In a production implementation, this action would open the corresponding live product listing so the shopper could review the full listing and continue toward purchase.

---

## Technology Stack

The prototype uses:

- Node.js
- Express
- JavaScript
- HTML
- CSS
- Google Gemini API
- Google GenAI SDK
- JSON product data
- GitHub
- Railway

No local AI model is required.

---

## Project Structure

```text
etsy-ai-shopping-assistant/
│
├── README.md
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
├── .env.example
│
├── data/
│   └── synthetic_etsy_listings.json
│
└── public/
    ├── index.html
    ├── style.css
    └── app.js
```

The `.env` file and `node_modules` directory are intentionally excluded from the repository.

---

## API Key Security

The Gemini API key is never hardcoded into the source code.

For local development, the application reads the key from:

```text
GEMINI_API_KEY
```

inside a local `.env` file.

The `.env` file is excluded from GitHub through `.gitignore`.

For the Railway deployment, the Gemini API key is stored as a private Railway environment variable.

The browser does not receive or expose the Gemini API key.

---

## Run Locally

### Requirements

To run the application locally, you need:

- Node.js 20 or newer
- npm
- A Google Gemini API key

### Step 1 — Clone or Download the Repository

Clone the repository or download the project files.

### Step 2 — Install Dependencies

From the project directory, run:

```bash
npm install
```

### Step 3 — Configure the API Key

Create a file named:

```text
.env
```

in the root project directory.

Add:

```text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
PORT=3000
```

Replace `YOUR_GEMINI_API_KEY_HERE` with a valid Gemini API key.

Do not commit the `.env` file to GitHub.

### Step 4 — Start the Application

Run:

```bash
npm start
```

### Step 5 — Open the Website

Open the following address in a web browser:

```text
http://localhost:3000
```

---

## Example Request

A recommended test request is:

> I need a personalized birthday gift for my mom under $50 that can arrive within two weeks. She likes silver minimalist jewelry.

The application should interpret criteria similar to:

```text
Recipient: Mom
Occasion: Birthday
Budget: $50
Category: Jewelry
Style: Silver, Minimalist
Personalization: Required
Maximum Delivery: 14 days
```

It then retrieves relevant products and displays three AI-assisted recommendations.

---

## Edge and Invalid Input Handling

The prototype includes basic handling for several edge cases.

### Empty Input

An empty request is rejected before an API request is made.

### Very Short Input

A very short request prompts the shopper to provide more information.

### Ambiguous Input

If the request does not contain enough information to produce useful recommendations, Gemini can return a concise clarifying question.

### Invalid AI Product IDs

If Gemini returns a product ID that does not exist in the candidate dataset, the server ignores that recommendation.

### Temporary API Errors

The application retries temporary Gemini API errors such as rate-limit or service-availability errors before returning an error message to the shopper.

These behaviors help the prototype fail more gracefully without requiring production-level error infrastructure.

---

## Railway Deployment

The live application is hosted using Railway.

The deployment process is:

```text
Public GitHub Repository
        ↓
Railway Deployment
        ↓
Node.js / Express Server
        ↓
Gemini API
        ↓
Public Web Application
```

Railway installs the project dependencies and starts the Express application.

The production Gemini API key is configured through the Railway environment variable:

```text
GEMINI_API_KEY
```

The application uses Railway's dynamically assigned `PORT` environment variable when deployed.

---

## What a Production Version Would Require

This prototype demonstrates the core AI interaction rather than a production-ready Etsy system.

A production implementation would require several additional capabilities.

### Marketplace Data

The synthetic dataset would be replaced with current marketplace information including:

- Live listings
- Current prices
- Product availability
- Seller information
- Current shipping estimates
- Current reviews
- Listing changes

### Retrieval Infrastructure

A production implementation would require scalable marketplace search and retrieval rather than searching a small local JSON dataset.

### User Context

With appropriate privacy controls, a production version could incorporate:

- Shopper history
- Saved items
- Previous purchases
- Stated preferences
- Location-dependent delivery information

### Security and Reliability

Production infrastructure would also require:

- Authentication
- Authorization
- Rate limiting
- Monitoring
- Logging
- Security controls
- Failure recovery
- API usage monitoring

### AI Evaluation

The recommendation system would require systematic evaluation for:

- Recommendation relevance
- Hallucination rate
- Constraint satisfaction
- User satisfaction
- Conversion impact
- Latency
- Cost

### Experimentation

The feature would need controlled testing and A/B experimentation to determine whether it improves business outcomes such as decision time, listing engagement, and purchase conversion.

### Live Product Navigation

The View Item action would link directly to the corresponding live marketplace listing.

---

## Relationship to the Feature Specification

The prototype implements the interaction described in the team's Feature Specification.

The feature is designed to:

1. Accept a natural-language shopping request.
2. Extract the shopper's requirements.
3. Retrieve relevant products.
4. Compare products against those requirements.
5. Present a concise recommendation.
6. Allow the shopper to refine the request or continue toward a product.

The prototype therefore demonstrates the core user interaction rather than only showing a generic LLM conversation.

---

## Relationship to the Build / Buy / Partner Analysis

The prototype uses the **Google Gemini API** for general-purpose language understanding and generation.

This is consistent with the team's sourcing strategy of using an external foundation-model API for rapid implementation while retaining control over:

- Product data
- Retrieval logic
- Recommendation rules
- Product grounding
- User experience
- Marketplace-specific functionality

The general-purpose language capability can therefore be externally provided while the differentiated marketplace layer remains under Etsy's control.

---

## Prototype Limitations

This prototype has several intentional limitations.

- Product listings are synthetic.
- The dataset contains only 100 products.
- Product availability is not real-time.
- Delivery estimates are synthetic.
- Reviews and ratings are synthetic.
- There is no shopper authentication.
- There is no persistent user history.
- There is no production recommendation model.
- There is no direct Etsy marketplace integration.
- The View Item action does not lead to a real purchase page.
- API usage is designed for demonstration rather than production scale.

These limitations are appropriate for the purpose of demonstrating the core AI interaction.

---

## AI Coding Assistant Disclosure

ChatGPT was used as an AI coding assistant during development.

It was used for:

- Code scaffolding
- Debugging support
- Prompt refinement
- Interface development
- Documentation
- Deployment preparation

The final prototype was assembled and tested as part of the team's academic project.

---

## Academic Disclaimer

This project is an academic proof of concept.

It is not affiliated with, endorsed by, sponsored by, or operated by Etsy.

The product listings, ratings, reviews, prices, delivery estimates, and other marketplace information used in the prototype are synthetic and do not represent actual Etsy listings.
