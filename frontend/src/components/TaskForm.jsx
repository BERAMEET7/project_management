import styles from './TaskForm.module.css';

export default function TaskForm({ form, setForm, projectId, onCreate, onUpdate, onDelete, fetchTasks }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { ...form, project_id: projectId };
    if (form.id) {
      await onUpdate(form.id, taskData);
    } else {
      await onCreate(taskData);
    }
    setForm({ name: '', due_date: '', description: '', id: null });
    fetchTasks();
  };

  const handleDelete = async () => {
    if (form.id) {
      await onDelete(form.id);
      setForm({ name: '', due_date: '', description: '', id: null });
      fetchTasks();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{form.id ? 'Edit Task' : 'Create Task'}</h3>
      <input name="name" placeholder="Task Name" value={form.name} onChange={handleChange} required />
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <div className={styles.buttonGroup}>
        <button type="submit">{form.id ? 'Update' : 'Create'} Task</button>
        {form.id && <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete</button>}
      </div>
    </form>
  );
}
