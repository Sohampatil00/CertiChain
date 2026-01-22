import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CredentialRequest } from "@/lib/definitions";
import { cn } from "@/lib/utils";

const statusStyles: { [key: string]: string } = {
  pending: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
  approved: "border-green-500/50 text-green-600 dark:text-green-400",
  rejected: "border-red-500/50 text-red-600 dark:text-red-400",
};

export default function RequestsTable({ requests }: { requests: CredentialRequest[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credential Requests</CardTitle>
        <CardDescription>A list of recent credential requests from students.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Credential Type</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.studentName}</TableCell>
                <TableCell>{request.credentialType}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", statusStyles[request.status])}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/dashboard/admin/${request.id}`}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View Details</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
