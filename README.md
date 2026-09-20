# Etsy AI Shopping Decision Assistant

**Group 10 — Rita Sharipova, Khushi Patel, Anh Ho, Ngan Hang**

A working proof of concept for an AI-assisted Etsy shopping feature that converts a shopper's natural-language request into structured shopping criteria and recommends relevant products based on budget, personalization, delivery, reviews, and product fit.

## Live Demo

https://etsy-ai-shopping-assistant-production.up.railway.app/

## What the Prototype Demonstrates

The prototype demonstrates the core interaction described in the Feature Specification:

1. A shopper enters a natural-language shopping request.
2. Google Gemini extracts structured shopping criteria.
3. The application retrieves relevant products from a synthetic Etsy-style dataset.
4. Gemini compares the strongest candidates against the shopper's requirements.
5. The interface displays three recommendations with product information, match explanations, review themes, and any unmet requirements.

If important information is missing, the assistant can ask a clarifying question instead of making unsupported assumptions.

## Technology

- Google Gemini API
- Node.js / Express
- HTML, CSS, and JavaScript
- Synthetic Etsy-style product dataset
- Railway

## How to Run

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Gemini API key

Create a `.env` file in the project root:

```text
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

The API key is not included in this repository.

### 3. Start the application

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Example Request

> I need a personalized birthday gift for my mom under $50 that can arrive within two weeks. She likes silver minimalist jewelry.

## Data and Grounding

The prototype uses 100 synthetic Etsy-style listings created for demonstration purposes. Product facts such as price, personalization, delivery estimates, ratings, and review themes come from the structured dataset rather than being generated independently by the LLM.

This approach helps reduce hallucinated product information by separating verified product data from AI-generated interpretation and recommendation explanations.

## Production Version

A production Etsy implementation would replace the synthetic dataset with current Etsy marketplace data, including live listing availability, prices, inventory, shipping estimates, seller information, reviews, and product URLs.

A production system would also require authentication, scalable product retrieval, monitoring, privacy and security controls, and additional testing for recommendation accuracy and AI-specific failure modes.

## AI Tool Disclosure

ChatGPT was used as a coding assistant to help scaffold, debug, and refine the prototype.

## Academic Disclaimer

This project was developed as an academic proof of concept and is not affiliated with or endorsed by Etsy, Inc.
