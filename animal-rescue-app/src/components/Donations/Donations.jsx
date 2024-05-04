import { useContext, useEffect, useState } from "react";
import DonationTable from "./DonationTable";
import { getDonations } from "../../api/donations";
import groupBy from "lodash/groupBy";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAuth } from "../../utils/context/authContext";
import {
  deleteDonation,
  updateDonation,
  createDonation,
} from "../../api/donations";
import DonationForm from "./DonationForm";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [dialog, setDialog] = useState(false);
  const { isAdmin } = useAuth();

  const resetDonations = () => getDonations().then(setDonations);

  useEffect(() => {
    resetDonations();
  }, []);

  const onAdminDeleteDonation = (donation) => {
    deleteDonation(donation._id).then(resetDonations);
  };

  const onUserMakeDonation = (donation) => {
    updateDonation({ ...donation, category: "donated" }).then(resetDonations);
  };
  const onAdminMarkAsDonated = (donation) => {
    updateDonation({ ...donation, category: "donated" }).then(resetDonations);
  };

  const onAdminAcceptDonation = (donation) => {
    updateDonation({ ...donation, category: "donated" }).then(resetDonations);
  };

  const onAdminRepeatDonation = (donation) => {
    updateDonation({ ...donation, category: "seeking"}).then(resetDonations);
  };

  const onSubmit = (donation) => {
    createDonation({ ...donation, category: isAdmin ? "seeking" : "offered" })
      .then(resetDonations)
      .then(() => setDialog(false));
  };

  const donationsByCategory = groupBy(donations, "category");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Box sx={{ minWidth: 700, display: "flex", mt: 2 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setDialog(true)}
        >
          {isAdmin ? "Request donation" : "Donate"}
        </Button>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>{isAdmin ? "Request donation" : "Donate"}</DialogTitle>
          <DialogContent sx={{ maxWidth: 500 }}>
            <DonationForm onSubmit={onSubmit} />
          </DialogContent>
        </Dialog>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 2,
          minWidth:700,
          overflowX:"scroll",
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Seeking
          </Typography>
          <DonationTable
            donations={donationsByCategory["seeking"]}
            isAdmin={isAdmin}
            onAdminMarkAsDonated={onAdminMarkAsDonated}
            onAdminDeleteDonation={onAdminDeleteDonation}
            onUserMakeDonation={onUserMakeDonation}
          />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Offered
          </Typography>
          <DonationTable
            donations={donationsByCategory["offered"]}
            isAdmin={isAdmin}
            onAdminAcceptDonation={onAdminAcceptDonation}
          />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={600} mb={1}>
            Donated
          </Typography>
          <DonationTable
            donations={donationsByCategory["donated"]}
            isAdmin={isAdmin}
            onAdminRepeatDonation={onAdminRepeatDonation}
            onAdminDeleteDonation={onAdminDeleteDonation}
          />
        </Box>
      </Box>
    </Box>
  );
}
