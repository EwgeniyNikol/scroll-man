import React, { useEffect, useRef } from "react";
import { useTasksInfiniteQuery } from "@entities/task";
import { TaskCard, TaskCardSkeleton } from "@entities/task/ui";
import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./TaskListVirtualized.module.scss";

export const TaskListVirtualized: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTasksInfiniteQuery();

  // Получаем все задачи из всех страниц
  const allTasks = data?.pages.flatMap((page) => page.data) || [];
  const parentRef = useRef<HTMLDivElement>(null);

  // Настройка виртуализатора
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allTasks.length + 1 : allTasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => window.innerWidth < 768 ? 200 : 230,
    overscan: 5,
    scrollPaddingEnd: 50,
  });

  // Загрузка следующих страниц при прокрутке
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;

    if (
      lastItem.index >= allTasks.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    allTasks.length,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  // Обработка изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      // Виртуализатор автоматически пересчитает размеры
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.virtualizedList}>
        {Array.from({ length: 10 }).map((_, index) => (
          <TaskCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error.message}</div>;
  }

  const totalTasks = data?.pages[0]?.total || 0;

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        Всего задач: <span>{totalTasks}</span> | Загружено: <span>{allTasks.length}</span>
        {hasNextPage && " | Есть еще..."}
      </div>
      
      <div
        ref={parentRef}
        className={styles.virtualizedList}
        style={{ height: "80vh" }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index > allTasks.length - 1;
            const task = allTasks[virtualItem.index];

            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    <div className={styles.loadingMore}>
                      <div className={styles.spinner}></div>
                      Загрузка следующих задач...
                    </div>
                  ) : (
                    <div className={styles.noMoreTasks}>
                      🎉 Все задачи загружены ({totalTasks})
                    </div>
                  )
                ) : task ? (
                  <TaskCard task={task} index={virtualItem.index} />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={styles.hint}>
        Используйте колесико мыши или стрелки для прокрутки
      </div>
    </div>
  );
};
