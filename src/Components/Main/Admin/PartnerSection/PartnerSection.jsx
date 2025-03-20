import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Мокові дані для агентів і партнерів
const mockAgents = [
    {
        id: 1,
        name: 'Агент 1',
        referralCode: 'AGENT1',
        earnings: 1000, // Заробіток агента
        country: 'Україна', // Країна агента
        paymentHistory: [ // Історія виплат і нарахувань
            { id: 1, date: '2023-10-01', amount: 200, type: 'Нарахування', description: 'За залучення партнера' },
            { id: 2, date: '2023-10-15', amount: 300, type: 'Виплата', description: 'Переказ на картку' },
        ],
        linkedPartners: [
            {
                id: 1,
                name: 'Партнер 1',
                earnings: 500,
                referralCode: 'PARTNER1',
                referralUsage: {
                    monthly: 12, // Використано за місяць
                    total: 120, // Використано за весь час
                },
                paymentHistory: [
                    { id: 1, date: '2023-10-05', amount: 100, type: 'Нарахування', description: 'За залучення клієнта' },
                    { id: 2, date: '2023-10-20', amount: 50, type: 'Виплата', description: 'Переказ на картку' },
                ],
            },
            {
                id: 2,
                name: 'Партнер 2',
                earnings: 300,
                referralCode: 'PARTNER2',
                referralUsage: {
                    monthly: 8,
                    total: 80,
                },
                paymentHistory: [
                    { id: 1, date: '2023-10-10', amount: 80, type: 'Нарахування', description: 'За залучення клієнта' },
                ],
            },
        ],
    },
    {
        id: 2,
        name: 'Агент 2',
        referralCode: 'AGENT2',
        earnings: 800,
        country: 'Польща',
        paymentHistory: [
            { id: 1, date: '2023-10-02', amount: 150, type: 'Нарахування', description: 'За залучення партнера' },
        ],
        linkedPartners: [
            {
                id: 3,
                name: 'Партнер 3',
                earnings: 400,
                referralCode: 'PARTNER3',
                referralUsage: {
                    monthly: 5,
                    total: 50,
                },
                paymentHistory: [
                    { id: 1, date: '2023-10-12', amount: 60, type: 'Нарахування', description: 'За залучення клієнта' },
                ],
            },
        ],
    },
];

const PaymentHistory = ({ history }) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                Історія виплат і нарахувань:
            </Typography>
            <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                {history.map((item) => (
                    <ListItem key={item.id} divider>
                        <ListItemText
                            primary={`${item.date}: ${item.type} - $${item.amount}`}
                            secondary={item.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

const AgentCard = ({ agent, onDeleteAgent }) => {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 3, mb: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Агент: {agent.name}
                    </Typography>
                    <IconButton onClick={() => onDeleteAgent(agent.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                    <Typography variant="body1">Реферальний код: {agent.referralCode}</Typography>
                    <Typography variant="body1">Заробіток: ${agent.earnings}</Typography>
                    <Typography variant="body1">Країна: {agent.country}</Typography>
                </Box>
                <PaymentHistory history={agent.paymentHistory} />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'left' }}>
                    Прив’язані партнери:
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {agent.linkedPartners.map((partner) => (
                        <Grid item xs={12} sm={6} md={4} key={partner.id}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ textAlign: 'left' }}>{partner.name}</Typography>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray', textAlign: 'left' }}>
                                        Реферальний код: {partner.referralCode}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                        Заробіток: ${partner.earnings}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                        Використано за місяць: {partner.referralUsage.monthly}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
                                        Використано за весь час: {partner.referralUsage.total}
                                    </Typography>
                                    <PaymentHistory history={partner.paymentHistory} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

const Partner = () => {
    const [agents, setAgents] = useState(mockAgents);
    const handleDeleteAgent = (agentId) => {
        setAgents(agents.filter((agent) => agent.id !== agentId));
    };
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'left' }}>
                Агенти та Партнери
            </Typography>
            {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} onDeleteAgent={handleDeleteAgent} />
            ))}
        </Box>
    );
};

export default Partner;
