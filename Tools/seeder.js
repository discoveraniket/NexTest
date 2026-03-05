/**
 * NexTest Data Seeder
 * -------------------
 * This script uploads an exam, its session, subjects, and questions to Supabase.
 * It uses the .env file in the App directory for configuration.
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// --- Setup Paths & Config ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the App directory
dotenv.config({ path: path.resolve(__dirname, '../App/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase credentials not found in App/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed(filePath) {
  try {
    console.log(`\n🚀 Starting upload for: ${filePath}...`);
    
    // 1. Read and Parse JSON
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`File not found: ${absolutePath}`);
    }
    const data = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));

    // 2. Upsert Exam
    console.log(`- Creating/Updating Exam: ${data.exam.name}...`);
    const { data: exam, error: examErr } = await supabase
      .from('exams')
      .upsert({ 
        name: data.exam.name, 
        category: data.exam.category, 
        description: data.exam.description 
      }, { onConflict: 'name' })
      .select()
      .single();

    if (examErr) throw examErr;

    // 3. Create Session
    console.log(`- Creating Session: ${data.session.year}...`);
    const { data: session, error: sessionErr } = await supabase
      .from('exam_sessions')
      .insert({
        exam_id: exam.id,
        year: data.session.year,
        duration_minutes: data.session.duration_minutes,
        correct_marks: data.session.correct_marks,
        negative_marks: data.session.negative_marks,
        is_active: data.session.is_active
      })
      .select()
      .single();

    if (sessionErr) throw sessionErr;

    // 4. Process Subjects and Questions
    for (const subjectData of data.subjects) {
      console.log(`  > Adding Subject: ${subjectData.name} (${subjectData.questions.length} questions)`);
      
      const { data: subject, error: subErr } = await supabase
        .from('subjects')
        .insert({
          session_id: session.id,
          name: subjectData.name,
          display_order: subjectData.display_order
        })
        .select()
        .single();

      if (subErr) throw subErr;

      // Prepare Batch Questions
      const questionsToInsert = subjectData.questions.map(q => ({
        subject_id: subject.id,
        content: q.content,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        difficulty_level: q.difficulty_level || 'medium'
      }));

      const { error: qErr } = await supabase
        .from('questions')
        .insert(questionsToInsert);

      if (qErr) throw qErr;
    }

    console.log(`\n✅ SUCCESS: Exam "${data.exam.name} (${data.session.year})" is now live!`);
    console.log(`🔗 Dashboard: Check the "Available Examinations" section.\n`);

  } catch (err) {
    console.error(`\n❌ ERROR during seeding:`, err.message);
    process.exit(1);
  }
}

// --- CLI Execution ---
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node Tools/seeder.js <path-to-json-file>');
  console.log('Example: node Tools/seeder.js Tools/exam_template.json');
} else {
  seed(args[0]);
}
