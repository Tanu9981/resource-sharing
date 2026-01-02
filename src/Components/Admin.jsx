import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Avatar,
  Tooltip
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import InfoIcon from "@mui/icons-material/Info";

export default function Admin() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setResources([
        { id: "1", title: "Python Basics Notes", subject: "Python", semester: "3", type: "Notes", uploader: "Rahul" },
        { id: "2", title: "Java Advanced PYQ", subject: "Java", semester: "5", type: "PYQ", uploader: "Priya" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress size={50}/></Box>;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <PendingIcon fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="700">Admin Moderation</Typography>
      </Stack>

      {resources.length === 0
        ? <Typography textAlign="center">🎉 No pending resources!</Typography>
        : resources.map(res => (
          <Card key={res.id} sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{res.type.charAt(0)}</Avatar>
                <Typography variant="h6" fontWeight="700">{res.title}</Typography>
                <Chip label={res.type} size="small"/>
              </Stack>

              <Divider sx={{ my: 2 }}/>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" startIcon={<CheckCircleIcon />}>Approve</Button>
                <Button variant="outlined" color="error" startIcon={<CancelIcon />}>Reject</Button>
                <Button variant="text" startIcon={<InfoIcon />} onClick={() => navigate(`/resource/${res.id}`)}>
                  Info
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      }
    </Box>
  );
}
