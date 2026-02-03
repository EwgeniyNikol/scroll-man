import { Task } from '../model/types';

const API_BASE = '/api';

export const taskApi = {
  getTasks: async (page: number, limit: number = 20) => {
    const response = await fetch(`${API_BASE}/tasks?_page=${page}&_limit=${limit}`);
    const total = response.headers.get('X-Total-Count');
    const data = await response.json();
    return { 
      data,
      total: parseInt(total || '0') 
    };
  },

  getTask: async (id: string | number): Promise<Task> => {
    const response = await fetch(`${API_BASE}/tasks/${id}`);
    return response.json();
  },

  createTask: async (task: Omit<Task, 'id' | 'createdAt' | 'userId'>): Promise<Task> => {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...task,
        userId: 1,
        createdAt: new Date().toISOString(),
      })
    });
    return response.json();
  },

  updateTask: async (id: string | number, task: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    return response.json();
  },

  deleteTask: async (id: string | number): Promise<Task> => {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
