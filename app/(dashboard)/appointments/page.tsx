import { Calendar } from 'lucide-react'
import { EmptyState } from '@/components/ui/empty-state'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AppointmentsPage() {
  return (
    <div>
      <header>
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Booked jobs and upcoming calls
        </p>
      </header>

      <div className="mt-8">
        <Tabs defaultValue="list">
          <TabsList className="bg-surface">
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            <EmptyState
              icon={Calendar}
              title="No appointments scheduled"
              description="Once leads get qualified and booked, they'll show up here."
            />
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <EmptyState
              icon={Calendar}
              title="Calendar view coming soon"
              description="Connect Google Calendar in Settings to sync your bookings."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
