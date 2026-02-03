import React, { useState } from "react";
import { Task, TaskPriority, PriorityOption } from "@entities/task";
import { useUpdateTask } from "@entities/task";
import styles from "./TaskEditForm.module.scss";

interface TaskEditFormProps {
  task: Task;
  onSuccess?: () => void;
  onCancel: () => void;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  onSuccess,
  onCancel,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);
  const [priority, setPriority] = useState<TaskPriority>(task.priority || "medium");

  const updateTaskMutation = useUpdateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Введите заголовок задачи");
      return;
    }

    updateTaskMutation.mutate(
      {
        id: task.id,
        task: {
          title: title.trim(),
          description: description.trim(),
          completed,
          priority,
        },
      },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  const isSubmitting = updateTaskMutation.isPending;

  const priorityOptions: PriorityOption[] = [
    { value: "low", label: "Низкий", color: "#3b82f6", emoji: "🔵" },
    { value: "medium", label: "Средний", color: "#f59e0b", emoji: "🟡" },
    { value: "high", label: "Высокий", color: "#ef4444", emoji: "🔴" },
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="edit-title" className={styles.label}>
          Заголовок задачи *
        </label>
        <input
          id="edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Название задачи"
          disabled={isSubmitting}
          maxLength={100}
        />
        <div className={styles.counter}>
          {title.length}/100 символов
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-description" className={styles.label}>
          Описание задачи
        </label>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Подробное описание"
          disabled={isSubmitting}
          rows={5}
          maxLength={500}
        />
        <div className={styles.counter}>
          {description.length}/500 символов
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Приоритет задачи
        </label>
        <div className={styles.priorityOptions}>
          {priorityOptions.map((option) => {
            const bgColor = priority === option.value ?
              `${option.color}15` : "#f9fafb";

            return (
              <label
                key={option.value}
                className={styles.priorityOption}
                style={{
                  borderColor: priority === option.value ? option.color : "#d1d5db",
                  backgroundColor: bgColor,
                }}
              >
                <input
                  type="radio"
                  name="edit-priority"
                  value={option.value}
                  checked={priority === option.value}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className={styles.priorityRadio}
                  disabled={isSubmitting}
                />
                <span className={styles.priorityLabel} style={{ color: option.color }}>
                  {option.emoji} {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.checkboxGroup}>
          <input
            id="edit-completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className={styles.checkbox}
            disabled={isSubmitting}
          />
          <label htmlFor="edit-completed" className={styles.checkboxLabel}>
            Задача выполнена
          </label>
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Сохранение...
              </>
            ) : (
              "Сохранить изменения"
            )}
          </button>
        </div>

        <div className={styles.hint}>
          * — обязательное поле
        </div>
      </div>

      {updateTaskMutation.isError && (
        <div className={styles.error}>
          Ошибка при обновлении задачи: {updateTaskMutation.error.message}
        </div>
      )}
    </form>
  );
};
