# 🚀 NexTest Data Tools

This directory contains the utilities for bulk-uploading examination data to your Supabase database.

## 📁 Files
- **`exam_template.json`**: The standard structure for your exam data.
- **`seeder.js`**: The Node.js script that performs the upload.

---

## 🛠️ How to Add a New Exam

### Step 1: Prepare the JSON
1. Duplicate `exam_template.json`.
2. Fill in the exam details, subjects, and questions.
3. **Note**: The `correct_answer` must match one of the keys in the `options` object (e.g., "A", "B").

### Step 2: Install Dependencies (If not done)
Ensure you have the required packages installed in your project:
```bash
npm install dotenv @supabase/supabase-js
```

### Step 3: Run the Seeder
Open your terminal in the **root directory** of the project and run:
```bash
node Tools/seeder.js Tools/your_exam_file.json
```

---

## 💡 Pro Tips

### Optional Fields
- **`explanation`**: You can skip this. If omitted, it will be stored as `NULL`.
- **`difficulty_level`**: You can skip this. If omitted, it defaults to `"medium"`.
- **Lean Format**: You only *need* `content`, `options`, and `correct_answer` for a question to work.

### What happens if I rerun the same JSON?
- **Exams**: The script checks the `name` of the exam. If it already exists, it **updates** the metadata (Category/Description) instead of creating a duplicate.
- **Sessions & Questions**: Every time you run the script, it creates a **brand new Session** (e.g., JEE 2025). This means if you rerun the same file, you will see a duplicate card on your dashboard.
  - *Best Practice*: If you made a mistake in a session, delete the old session from the Supabase Table Editor before rerunning the script.

### Images
- For now, put image URLs directly in the `content` field if needed.

### Security
- The script uses the credentials in `App/.env`. Never share this file!

---

## 🏗️ JSON Structure Reference
- **`exam`**: Metadata about the test (Category, Description).
- **`session`**: Specific instance (Year, Duration, Marking Scheme).
- **`subjects`**: Array of sections (Math, Physics, etc.).
- **`questions`**: Array of MCQs within each subject.
