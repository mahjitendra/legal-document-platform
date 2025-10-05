import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './DocumentEditor.module.css';

const DocumentEditor = ({ initialContent = '', onSave, onCancel }) => {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(content);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button type="button" className={styles.toolButton} title="Bold">
          <strong>B</strong>
        </button>
        <button type="button" className={styles.toolButton} title="Italic">
          <em>I</em>
        </button>
        <button type="button" className={styles.toolButton} title="Underline">
          <u>U</u>
        </button>
      </div>

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your document..."
      />

      <div className={styles.actions}>
        <Button onClick={handleSave} loading={saving}>
          Save Document
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;
