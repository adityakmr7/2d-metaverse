import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Admin/Layout.tsx";

function AdminDashboard() {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Spaces</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">10</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">50</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
