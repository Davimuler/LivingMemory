import React, {useState} from 'react';
import {Card, Typography} from "@mui/material";



function SupportContacts(props) {

    return (
        <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Контакти техпідтримки
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Email: support@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Телефон: +380 12 345 6789
            </Typography>
        </Card>
    );
}

export default SupportContacts;