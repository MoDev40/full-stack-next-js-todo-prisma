import TodoFormDialog from "./_component/todo/TodoFormDialog";
import Todos from "./_component/todo/Todos";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto p-6 space-y-4">
      <TodoFormDialog/>
      <Todos/>
    </div>
  );
}
