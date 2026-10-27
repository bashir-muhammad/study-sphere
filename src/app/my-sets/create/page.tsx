"use client";
import styles from "./page.module.css";
import {
  FormField,
  TextInput,
  TextArea,
  Select,
} from "@/components/input-field/input-field";
import { Card } from "@/components/card/card";

const CreateStudySetPage = () => {
  const categoryOptions = [
    { value: "Science", label: "Science" },
    { value: "Design", label: "Design" },
    { value: "History", label: "History" },
    { value: "Languages", label: "Languages" },
  ];
  return (
    <div>
      <h1>Create Study Set</h1>
      <p>This is where you can create a new study set.</p>
      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <Card className={styles.detailsCard}>
            <h2 className={styles.cardTitle}>Deck Details</h2>
            <div className={styles.formGroup}>
              <FormField label="Deck Name">
                <TextInput
                  placeholder="e.g., Quantum Mechanics Fundamentals"
                  id="deck-name-input"
                />
              </FormField>

              <FormField label="Focus Domain (Category)">
                <Select
                  value=""
                  options={categoryOptions}
                  id="category-select"
                />
              </FormField>

              <FormField label="Description">
                <TextArea
                  placeholder="Briefly describe what this deck covers..."
                  id="description-textarea"
                />
              </FormField>
            </div>
          </Card>
        </aside>
        <main className={styles.contentArea}>
          <Card>
            <h2 className={styles.cardTitle}>Add Flashcards</h2>
            <p>Start adding flashcards to your deck here.</p>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreateStudySetPage;
