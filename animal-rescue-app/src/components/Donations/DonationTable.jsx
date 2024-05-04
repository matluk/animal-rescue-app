import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { donationTableColumns as columns } from "../../utils/donation";
import DonationTableRow from "./DonationTableRow";

export default function DonationTable({
  donations = [],
  isAdmin,
  onAdminDeleteDonation,
  onUserMakeDonation,
  onAdminMarkAsDonated,
  onAdminAcceptDonation,
  onAdminRepeatDonation,
}) {
  return (
    <TableContainer style={{ maxHeight: 228, width: "100%" }} component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                size="small"
                key={column.id}
                align={column.align}
                sx={column.styles}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.map((donation) => (
            <DonationTableRow
              key={donation._id}
              donation={donation}
              columns={columns}
              isAdmin={isAdmin}
              onAdminDeleteDonation={onAdminDeleteDonation}
              onUserMakeDonation={onUserMakeDonation}
              onAdminMarkAsDonated={onAdminMarkAsDonated}
              onAdminAcceptDonation={onAdminAcceptDonation}
              onAdminRepeatDonation={onAdminRepeatDonation}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
