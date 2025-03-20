import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, IconButton, Divider, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Мокові дані для користувачів
const mockUsers = [
    {
        id: 1,
        status: 'Активний',
        couponUsage: 5,
        referralCoupon: 'REF123',
        linkedProfiles: [
            { id: 1, name: 'Іван Іванов', quote: 'Пам’ять про тебе назавжди', description: 'Опис профілю 1' },
            { id: 2, name: 'Марія Петрова', quote: 'Вічна пам’ять', description: 'Опис профілю 2' },
        ],
    },
    {
        id: 2,
        status: 'Неактивний',
        couponUsage: 2,
        referralCoupon: 'REF456',
        linkedProfiles: [
            { id: 3, name: 'Олексій Сидоров', quote: 'Світла пам’ять', description: 'Опис профілю 3' },
        ],
    },
];

// Компонент для відображення картки користувача
const UserCard = ({ user, onEditUser, onDeleteUser }) => {
    return (
        <Card sx={{ boxShadow: 3, borderRadius: 3, mb: 3 }}>
            <CardContent>
                {/* Заголовок і кнопки редагування/видалення */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Користувач #{user.id}
                    </Typography>
                    <Box>
                        <IconButton onClick={() => onEditUser(user.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteUser(user.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Інформація про користувача */}
                <Box sx={{ textAlign: 'left', mt: 2 }}>
                    <Typography variant="body1">
                        Статус: {user.status}
                    </Typography>
                    <Typography variant="body1">
                        Використання купона: {user.couponUsage}
                    </Typography>
                    <Typography variant="body1">
                        Реферальний купон: {user.referralCoupon}
                    </Typography>
                </Box>

                {/* Прив’язані профілі */}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'left' }}>
                    Прив’язані профілі:
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {user.linkedProfiles.map((profile) => (
                        <Grid item xs={12} sm={6} md={4} key={profile.id}>
                            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ textAlign: 'left' }}>{profile.name}</Typography>
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray', textAlign: 'left' }}>
                                        "{profile.quote}"
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', textAlign: 'left' }}>
                                        {profile.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <IconButton onClick={() => console.log('Редагувати профіль', profile.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => console.log('Видалити профіль', profile.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

// Основний компонент для розділу користувачів
const UsersSection = () => {
    const [users, setUsers] = useState(mockUsers);

    const handleEditUser = (userId) => {
        console.log('Редагувати користувача', userId);
        // Тут можна додати логіку для редагування користувача
    };

    const handleDeleteUser = (userId) => {
        console.log('Видалити користувача', userId);
        setUsers(users.filter((user) => user.id !== userId));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'left' }}>
                Користувачі
            </Typography>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                />
            ))}
        </Box>
    );
};

export default UsersSection;
