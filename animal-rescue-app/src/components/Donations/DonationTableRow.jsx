import { Button, TableCell, TableRow } from "@mui/material";

export default function DonationTableRow({
  donation,
  columns,
  isAdmin,
  onAdminDeleteDonation,
  onUserMakeDonation,
  onAdminMarkAsDonated,
  onAdminAcceptDonation,
  onAdminRepeatDonation,
}) {
  const adminMarkAsDonatedButton = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      sx={{ m: "2px" }}
      onClick={() => onAdminMarkAsDonated && onAdminMarkAsDonated(donation)}
    >
      Mark donated
    </Button>
  );

  const adminDeleteButton = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      sx={{ m: "2px" }}
      onClick={() => onAdminDeleteDonation && onAdminDeleteDonation(donation)}
    >
      Delete
    </Button>
  );

  const userMakeDonationButton = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      sx={{ m: "2px" }}
      onClick={() => onUserMakeDonation && onUserMakeDonation(donation)}
    >
      Donate
    </Button>
  );

  const adminAcceptDonationButton = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      sx={{ m: "2px" }}
      onClick={() => onAdminAcceptDonation && onAdminAcceptDonation(donation)}
    >
      Accept
    </Button>
  );

  const adminRepeatDonationButton = (
    <Button
      variant="contained"
      size="small"
      color="primary"
      sx={{ m: "2px" }}
      onClick={() => onAdminRepeatDonation && onAdminRepeatDonation(donation)}
    >
      Repeat
    </Button>
  );

  return (
    <TableRow hover key={donation._id}>
      {columns.map((column) => {
        if (column.id !== "actions") {
          return (
            <TableCell
              size="small"
              key={column.id}
              align={column.align}
              sx={column.styles}
            >
              {column.format
                ? column.format(donation[column.id])
                : donation[column.id]}
            </TableCell>
          );
        }
        // actions
        return (
          <TableCell
            size="small"
            key={column.id}
            align={column.align}
            sx={column.styles}
          >
            {donation.category === "seeking" && isAdmin && (
              <>
                {adminMarkAsDonatedButton}
                {adminDeleteButton}
              </>
            )}
            {donation.category === "seeking" &&
              !isAdmin &&
              userMakeDonationButton}
            {donation.category === "offered" &&
              isAdmin &&
              adminAcceptDonationButton}
            {donation.category === "donated" && isAdmin && (
              <>
                {adminRepeatDonationButton}
                {adminDeleteButton}
              </>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
