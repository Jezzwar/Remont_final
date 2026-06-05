import TetrisLoading from '@/components/ui/tetris-loader'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-graphite">
      <TetrisLoading size="sm" speed="fast" />
    </div>
  )
}
