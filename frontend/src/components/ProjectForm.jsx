import styles from './ProjectForm.module.css';

export default function ProjectForm({ form, setForm, onCreate, onUpdate, onDelete, onRefresh }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await onUpdate(form.id, form);
    } else {
      await onCreate(form);
    }
    setForm({ name: '', price: '', due_date: '', description: '', id: null });
    onRefresh();
  };

  const handleDelete = async () => {
    if (form.id) {
      await onDelete(form.id);
      setForm({ name: '', price: '', due_date: '', description: '', id: null });
      onRefresh();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{form.id ? 'Edit Project' : 'Create New Project'}</h3>
      <input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <div className={styles.buttonGroup}>
        <button type="submit">{form.id ? 'Update' : 'Create'} Project</button>
        {form.id && <button type="button" onClick={handleDelete} className={styles.deleteButton}>Delete</button>}
      </div>
    </form>
  );
}
