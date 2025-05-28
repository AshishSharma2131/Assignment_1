document.addEventListener('DOMContentLoaded', function() {
    // Read More functionality [cite: 9]
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreSkillsContent = document.getElementById('more-skills-content');

    if (readMoreBtn && moreSkillsContent) {
        readMoreBtn.addEventListener('click', function() {
            if (moreSkillsContent.style.display === 'none') {
                moreSkillsContent.style.display = 'block';
                readMoreBtn.textContent = 'Read Less';
            } else {
                moreSkillsContent.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            }
        });
    }

    // Edit Skills functionality [cite: 10]
    const editSkillsBtn = document.getElementById('edit-skills-btn');
    const editModal = document.getElementById('edit-modal');
    const closeButton = document.querySelector('.close-button');
    const editTextArea = document.getElementById('edit-textarea');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const skillsContentDiv = document.getElementById('skills-content');

    if (editSkillsBtn && editModal && closeButton && editTextArea && saveEditBtn && skillsContentDiv) {
        editSkillsBtn.addEventListener('click', function() {
            // Populate textarea with current skills content
            // We'll get the raw HTML and clean it up for editing.
            // A more robust solution might store skills data in JS and render dynamically.
            editTextArea.value = skillsContentDiv.innerHTML.replace(/<[^>]*>/g, '').trim();
            editModal.style.display = 'flex'; // Use flex to center
        });

        closeButton.addEventListener('click', function() {
            editModal.style.display = 'none';
        });

        saveEditBtn.addEventListener('click', function() {
            // Update the displayed content with the edited text
            // For simplicity, we're just putting the raw text back.
            // You might want to parse it back into structured HTML if editing complex layouts.
            skillsContentDiv.innerHTML = `<p>${editTextArea.value.replace(/\n/g, '</p><p>')}</p>`;
            editModal.style.display = 'none';
        });

        // Close modal if user clicks outside of it
        window.addEventListener('click', function(event) {
            if (event.target == editModal) {
                editModal.style.display = 'none';
            }
        });
    }
});