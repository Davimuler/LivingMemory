import React, {useState} from 'react';
import {
    Card, Chip, Divider,
    List,
    ListItem, ListItemText,
    Typography
} from "@mui/material";


function PaymentHistory(props) {

    const payments = [
        { id: 1, date: "2025-01-10", amount: "$10", status: "Оплачено" },
        { id: 2, date: "2025-02-05", amount: "$10", status: "Не оплачено" },
    ];
    return (
        <Card sx={{ p: 2, mb: 4, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Історія платежів</Typography>
            <List>
                {payments.map((payment, index) => (
                    <React.Fragment key={payment.id}>
                        <ListItem>
                            <ListItemText primary={`Дата: ${payment.date}`} secondary={`Сума: ${payment.amount}`} />
                            <Chip
                                label={payment.status}
                                sx={{
                                    backgroundColor: payment.status === "Оплачено" ? "#4CAF50" : "#FF5722",
                                    color: "white",
                                }}
                            />
                        </ListItem>
                        {index < payments.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </Card>
    );
}

export default PaymentHistory;