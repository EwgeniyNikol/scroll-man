import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskApi } from './taskApi';
import { Task } from '../model/types';

export const useTasksInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['tasks', 'infinite'],
    queryFn: ({ pageParam = 1 }) => taskApi.getTasks(pageParam, 20),
    getNextPageParam: (lastPage, pages) => {
      const totalItems = lastPage.total;
      const loadedItems = pages.reduce((acc, page) => acc + page.data.length, 0);
      return loadedItems < totalItems ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const useTaskQuery = (id: string | number) => {
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => taskApi.getTask(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskData: Omit<Task, 'id' | 'createdAt' | 'userId'>) => taskApi.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, task }: { id: string | number; task: Partial<Task> }) => 
      taskApi.updateTask(id, task),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string | number) => taskApi.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
