import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, MenuItem, Select, InputLabel, FormControl, Button, useMediaQuery, useTheme } from '@mui/material';
import UsersSection from "./UsersSection/UsersSection";
import PartnersAgentsSection from "./PartnerSection/PartnerSection";
import FinanceSection from "./FinanceSection/FinanceSection";
import SupportChat from "./SupportSection/SupportSection";
import SiteSettings from "./SettingsSection/SettingsSection";
import QrOrdersSection from "./QrOrdersSection/QrOrdersSection";

const Admin = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchType, setSearchType] = useState('user'); // Тип пошуку: користувач, профіль, агент або партнер
    const [searchQuery, setSearchQuery] = useState(''); // Пошуковий запит

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Для мобильных устройств

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        switch (searchType) {
            case 'user':
                console.log('Пошук користувача:', searchQuery);
                // Логіка для пошуку користувачів
                break;
            case 'profile':
                console.log('Пошук профілю:', searchQuery);
                // Логіка для пошуку профілів
                break;
            case 'agent':
                console.log('Пошук агента:', searchQuery);
                // Логіка для пошуку агентів
                break;
            case 'partner':
                console.log('Пошук партнера:', searchQuery);
                // Логіка для пошуку партнерів
                break;
            default:
                console.log('Невідомий тип пошуку');
        }
    };

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {/* Вкладки */}
            <Tabs
                value={selectedTab}
                onChange={handleChangeTab}
                centered={!isMobile} // Центруємо вкладки на ПК, на мобільних — ні
                variant={isMobile ? "scrollable" : "standard"} // Горизонтальна прокрутка на мобільних
                scrollButtons="auto" // Додаємо кнопки прокрутки на мобільних
            >
                <Tab label="Користувачі і профілі померлих" />
                <Tab label="Агенти і партнери" />
                <Tab label="Фінанси" />
                <Tab label="Чат підтримки" />
                <Tab label="Налаштування сайту" />
                <Tab label="Замовлення QR-табличок" />
            </Tabs>

            {/* Контент вкладок */}
            <Box sx={{ p: isMobile ? 1 : 3 }}>
                {/* Поле пошуку і вибору типу пошуку */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <FormControl sx={{ minWidth: 120, width: isMobile ? '100%' : 'auto' }}>
                        <InputLabel id="search-type-label">Шукати</InputLabel>
                        <Select
                            labelId="search-type-label"
                            value={searchType}
                            onChange={handleSearchTypeChange}
                            label="Шукати"
                        >
                            <MenuItem value="user">Користувача</MenuItem>
                            <MenuItem value="profile">Профіль</MenuItem>
                            <MenuItem value="agent">Агента</MenuItem>
                            <MenuItem value="partner">Партнера</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder={`Введіть ${
                            searchType === 'user' ? "ім'я користувача" :
                                searchType === 'profile' ? "ім'я профілю" :
                                    searchType === 'agent' ? "ім'я агента" :
                                        "ім'я партнера"
                        }`}
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        sx={{ width: isMobile ? '100%' : 'auto' }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{ width: isMobile ? '100%' : 'auto' }}
                    >
                        Пошук
                    </Button>
                </Box>

                {/* Секції вкладок */}
                {selectedTab === 0 && <UsersSection />}
                {selectedTab === 1 && <PartnersAgentsSection />}
                {selectedTab === 2 && <FinanceSection />}
                {selectedTab === 3 && <SupportChat />}
                {selectedTab === 4 && <SiteSettings />}
                {selectedTab === 5 && <QrOrdersSection />}
            </Box>
        </Box>
    );
};

export default Admin;