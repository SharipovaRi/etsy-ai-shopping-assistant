// ==================================================
// ELEMENTS
// ==================================================

const form =
  document.getElementById(
    "giftForm"
  );

const requestInput =
  document.getElementById(
    "request"
  );

const submitButton =
  document.getElementById(
    "submitButton"
  );

const errorMessage =
  document.getElementById(
    "errorMessage"
  );

const loadingPanel =
  document.getElementById(
    "loadingPanel"
  );

const resultsSection =
  document.getElementById(
    "resultsSection"
  );

const criteriaGrid =
  document.getElementById(
    "criteriaGrid"
  );

const recommendationGrid =
  document.getElementById(
    "recommendationGrid"
  );

const clarificationPanel =
  document.getElementById(
    "clarificationPanel"
  );

const clarifyingQuestion =
  document.getElementById(
    "clarifyingQuestion"
  );

const searchPanel =
  document.getElementById(
    "searchPanel"
  );

const startOverButton =
  document.getElementById(
    "startOverButton"
  );

const clarifyButton =
  document.getElementById(
    "clarifyButton"
  );


// ==================================================
// EXAMPLE REQUEST BUTTONS
// ==================================================

document
  .querySelectorAll(
    ".example-chip"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        requestInput.value =
          button.dataset.example || "";

        requestInput.focus();

      }
    );

  });


// ==================================================
// REFINE SEARCH
// ==================================================

if (startOverButton) {

  startOverButton.addEventListener(
    "click",
    () => {

      resultsSection
        .classList
        .add("hidden");

      clarificationPanel
        .classList
        .add("hidden");

      errorMessage.textContent =
        "";

      searchPanel
        .scrollIntoView({
          behavior: "smooth"
        });

      requestInput.focus();

    }
  );

}


// ==================================================
// CLARIFICATION BUTTON
// ==================================================

if (clarifyButton) {

  clarifyButton.addEventListener(
    "click",
    () => {

      clarificationPanel
        .classList
        .add("hidden");

      searchPanel
        .scrollIntoView({
          behavior: "smooth"
        });

      requestInput.focus();

    }
  );

}


// ==================================================
// SECURITY
// ESCAPE HTML
// ==================================================

function escapeHTML(value) {

  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


// ==================================================
// DISPLAY VALUE
// ==================================================

function displayValue(
  value,
  fallback = "Not specified"
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return fallback;

  }


  if (
    Array.isArray(value)
  ) {

    return value.length
      ? value.join(", ")
      : fallback;

  }


  return String(value);

}


// ==================================================
// SAFE NUMBER
// ==================================================

function displayPrice(value) {

  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return "Price unavailable";

  }


  return `$${number.toFixed(2)}`;

}


function displayRating(value) {

  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return "Not rated";

  }


  return number.toFixed(1);

}


function displayReviewCount(value) {

  const number =
    Number(value);

  if (
    !Number.isFinite(number)
  ) {

    return "0";

  }


  return number
    .toLocaleString();

}


// ==================================================
// RENDER SHOPPING CRITERIA
// ==================================================

function renderCriteria(
  criteria = {}
) {

  const budget =
    criteria.max_budget !== null &&
    criteria.max_budget !== undefined

      ? `Up to $${criteria.max_budget}`

      : "Not specified";


  const delivery =
    criteria.max_delivery_days !== null &&
    criteria.max_delivery_days !== undefined

      ? `Within ${criteria.max_delivery_days} days`

      : "Not specified";


  let personalization =
    "Not specified";


  if (
    criteria.personalization_required ===
    true
  ) {

    personalization =
      "Required";

  }
  else if (
    criteria.personalization_required ===
    false
  ) {

    personalization =
      "Not required";

  }


  const rows = [

    [
      "Recipient",
      displayValue(
        criteria.recipient
      )
    ],

    [
      "Occasion",
      displayValue(
        criteria.occasion
      )
    ],

    [
      "Budget",
      budget
    ],

    [
      "Category",
      displayValue(
        criteria.category
      )
    ],

    [
      "Style",
      displayValue(
        criteria.style
      )
    ],

    [
      "Personalization",
      personalization
    ],

    [
      "Delivery",
      delivery
    ],

    [
      "Interests",
      displayValue(
        criteria.interests
      )
    ]

  ];


  criteriaGrid.innerHTML =
    rows
      .map(
        ([label, value]) => `

          <div class="criterion">

            <span class="criterion-label">
              ${escapeHTML(label)}
            </span>

            <span class="criterion-value">
              ${escapeHTML(value)}
            </span>

          </div>

        `
      )
      .join("");

}


// ==================================================
// RENDER RECOMMENDATIONS
// ==================================================

function renderRecommendations(
  recommendations = []
) {

  // Make sure we only attempt to render
  // valid recommendation objects.

  const safeRecommendations =
    Array.isArray(
      recommendations
    )

      ? recommendations.filter(
          recommendation =>
            recommendation &&
            typeof recommendation ===
              "object"
        )

      : [];


  if (
    safeRecommendations.length === 0
  ) {

    recommendationGrid.innerHTML = `

      <div class="prototype-note">

        No recommendations could be displayed.
        Please refine your request and try again.

      </div>

    `;

    return;

  }


  recommendationGrid.innerHTML =
    safeRecommendations
      .map(
        (
          recommendation,
          index
        ) => {

          // IMPORTANT:
          //
          // The updated server returns product facts
          // directly on recommendation.
          //
          // There is NO:
          //
          // recommendation.product
          //
          // anymore.

          const product =
            recommendation;


          const met =
            Array.isArray(
              recommendation
                .requirements_met
            )

              ? recommendation
                  .requirements_met

              : [];


          const unmet =
            Array.isArray(
              recommendation
                .requirements_not_met
            )

              ? recommendation
                  .requirements_not_met

              : [];


          const reviewThemes =
            Array.isArray(
              product.review_themes
            )

              ? product.review_themes

              : [];


          const title =
            product.title ||
            "Untitled product";


          const category =
            product.category ||
            "Gift";


          const matchLevel =
            product.match_level ||
            "Good";


          const reason =
            product.reason ||
            "This product matches several parts of your shopping request.";


          const delivery =
            product
              .estimated_delivery_days !==
                null &&
            product
              .estimated_delivery_days !==
                undefined

              ? `${product.estimated_delivery_days} days`

              : "Not available";


          const personalization =
            product.personalizable ===
            true

              ? "Available"

              : "No";


          return `

            <article class="product-card">

              <div class="card-content">


                <!-- RANK + MATCH LEVEL -->

                <div class="card-top">

                  <span class="rank">
                    ${String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span class="match-badge">
                    ${escapeHTML(
                      matchLevel
                    )}
                  </span>

                </div>


                <!-- CATEGORY -->

                <p class="product-category">
                  ${escapeHTML(
                    category
                  )}
                </p>


                <!-- TITLE -->

                <h3>
                  ${escapeHTML(
                    title
                  )}
                </h3>


                <!-- PRICE -->

                <p class="price">
                  ${escapeHTML(
                    displayPrice(
                      product.price
                    )
                  )}
                </p>


                <!-- RATING -->

                <p class="rating">

                  ★ ${escapeHTML(
                    displayRating(
                      product.rating
                    )
                  )}

                  ·

                  ${escapeHTML(
                    displayReviewCount(
                      product.review_count
                    )
                  )}

                  reviews

                </p>


                <!-- PRODUCT FACTS -->

                <div class="facts">

                  <div>

                    <span>
                      Personalization
                    </span>

                    <strong>
                      ${escapeHTML(
                        personalization
                      )}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Est. delivery
                    </span>

                    <strong>
                      ${escapeHTML(
                        delivery
                      )}
                    </strong>

                  </div>

                </div>


                <!-- WHY IT MATCHES -->

                <p class="card-label">
                  Why it matches
                </p>

                <p class="reason">
                  ${escapeHTML(
                    reason
                  )}
                </p>


                <!-- REQUIREMENTS MET -->

                <p class="card-label">
                  Requirements met
                </p>


                <div class="tag-wrap">

                  ${
                    met.length

                      ? met
                          .map(
                            item => `

                              <span class="tag">
                                ✓ ${escapeHTML(
                                  item
                                )}
                              </span>

                            `
                          )
                          .join("")

                      : `

                          <span class="tag">
                            General match
                          </span>

                        `
                  }

                </div>


                <!-- TRADEOFFS -->

                ${
                  unmet.length

                    ? `

                        <div class="warning">

                          <strong>
                            ⚠ Tradeoff
                          </strong>

                          <br>

                          ${unmet
                            .map(
                              item =>
                                escapeHTML(
                                  item
                                )
                            )
                            .join("<br>")}

                        </div>

                      `

                    : `

                        <div class="all-good">
                          ✓ Meets the important
                          stated requirements
                        </div>

                      `
                }


                <!-- REVIEW THEMES -->

                <p class="card-label">
                  Review themes
                </p>


                <div class="review-themes">

                  ${
                    reviewThemes.length

                      ? reviewThemes
                          .map(
                            theme => `

                              <span>
                                ${escapeHTML(
                                  theme
                                )}
                              </span>

                            `
                          )
                          .join("")

                      : `

                          <span>
                            No review themes available
                          </span>

                        `
                  }

                </div>


                <!-- AI REVIEW INSIGHT -->

                ${
                  recommendation
                    .review_insight

                    ? `

                        <p class="review-insight">
                          ${escapeHTML(
                            recommendation
                              .review_insight
                          )}
                        </p>

                      `

                    : ""
                }


                <!-- VIEW ITEM -->

                <div class="product-action">

                  <button
                    type="button"
                    class="view-item-button"
                    data-listing-id="${escapeHTML(
                      product.listing_id ??
                      ""
                    )}"
                    data-product-title="${escapeHTML(
                      title
                    )}"
                  >
                    View item →
                  </button>

                </div>


              </div>

            </article>

          `;

        }
      )
      .join("");

}


// ==================================================
// VIEW ITEM
// ==================================================

recommendationGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        ".view-item-button"
      );


    if (!button) {

      return;

    }


    const listingId =
      button.dataset.listingId ||
      "N/A";


    const productTitle =
      button.dataset.productTitle ||
      "Selected product";


    alert(

      `${productTitle}\n\n` +

      `In a production version, this button would open ` +

      `the Etsy listing page for this product so the shopper ` +

      `could view the full listing and complete their purchase.\n\n` +

      `Listing ID: ${listingId}`

    );

  }
);


// ==================================================
// SUBMIT FORM
// ==================================================

form.addEventListener(
  "submit",

  async event => {

    event.preventDefault();


    const request =
      requestInput
        .value
        .trim();


    // Clear previous state.

    errorMessage.textContent =
      "";


    resultsSection
      .classList
      .add("hidden");


    clarificationPanel
      .classList
      .add("hidden");


    // ==================================================
    // INVALID INPUT
    // ==================================================

    if (!request) {

      errorMessage.textContent =
        "Please describe what you're looking for.";

      requestInput.focus();

      return;

    }


    if (
      request.length < 12
    ) {

      errorMessage.textContent =
        "Please add a little more detail about the gift you're looking for.";

      requestInput.focus();

      return;

    }


    // ==================================================
    // LOADING
    // ==================================================

    loadingPanel
      .classList
      .remove("hidden");


    submitButton.disabled =
      true;


    try {

      // ==================================================
      // CALL SERVER
      // ==================================================

      const response =
        await fetch(
          "/api/recommend",
          {

            method:
              "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body:
              JSON.stringify({
                request
              })

          }
        );


      // ==================================================
      // PARSE RESPONSE
      // ==================================================

      let data;


      try {

        data =
          await response.json();

      }
      catch {

        throw new Error(
          "The server returned an invalid response."
        );

      }


      // ==================================================
      // SERVER ERROR
      // ==================================================

      if (!response.ok) {

        throw new Error(

          data?.error ||

          "Something went wrong."

        );

      }


      // ==================================================
      // CLARIFICATION
      // ==================================================

      if (
        data.needs_clarification
      ) {

        clarifyingQuestion
          .textContent =

            data.clarifying_question ||

            "Could you tell me a little more about what you're looking for?";


        clarificationPanel
          .classList
          .remove("hidden");


        clarificationPanel
          .scrollIntoView({
            behavior: "smooth"
          });


        return;

      }


      // ==================================================
      // VALIDATE RESPONSE
      // ==================================================

      if (
        !data.criteria ||
        typeof data.criteria !==
          "object"
      ) {

        throw new Error(
          "The server did not return valid shopping criteria."
        );

      }


      if (
        !Array.isArray(
          data.recommendations
        ) ||
        data.recommendations.length ===
          0
      ) {

        throw new Error(
          "No product recommendations were returned."
        );

      }


      // ==================================================
      // RENDER RESULTS
      // ==================================================

      renderCriteria(
        data.criteria
      );


      renderRecommendations(
        data.recommendations
      );


      resultsSection
        .classList
        .remove("hidden");


      resultsSection
        .scrollIntoView({
          behavior: "smooth"
        });

    }
    catch (error) {

      console.error(
        "Shopping assistant error:",
        error
      );


      errorMessage.textContent =

        error?.message ||

        "Unable to generate recommendations.";

    }
    finally {

      // ==================================================
      // STOP LOADING
      // ==================================================

      loadingPanel
        .classList
        .add("hidden");


      submitButton.disabled =
        false;

    }

  }
);