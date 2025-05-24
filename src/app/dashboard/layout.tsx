import DashboardNavigation from '@/components/DashboardNavigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      {children}
    </div>
  )
} 