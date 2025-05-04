  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4GqIKcl4fEqH57rllRL-iijTkxuY4FrfxTZzOkruKj-suAa3I4frkePzdXALJ8wfgdB-hP_mPcPv5/pub?output=csv';

    async function fetchReviews() {
      try {
        const response = await fetch(spreadsheetUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const csvText = await response.text();
        const rows = csvText.split("\n").filter(row => row.trim() !== '');

        const reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.innerHTML = '';
        
        // Skip header row and process only valid rows
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const columns = row.split(',');
          
          // Ensure we have at least 4 columns (time, name, review, rating)
          if (columns.length >= 4) {
            const name = columns[1]?.trim() || 'Anonymous';
            const reviewText = columns[2]?.trim() || 'No review provided';
            const rating = parseInt(columns[3]) || 0;
            
            // Only display if we have valid content
            if (name !== 'Anonymous' || reviewText !== 'No review provided') {
              const reviewElement = document.createElement('div');
              reviewElement.classList.add('review');
              reviewElement.innerHTML = `
                <strong>${name}</strong>
                <p>${reviewText}</p>
                <div class="star-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
              `;
              reviewsContainer.appendChild(reviewElement);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        const reviewsContainer = document.getElementById('reviews-container');
        reviewsContainer.innerHTML = '<p>Unable to load reviews at this time.</p>';
      }
    }

    document.addEventListener('DOMContentLoaded', fetchReviews);

    // Refresh reviews every 5 minutes (optional)
    setInterval(fetchReviews, 300000);