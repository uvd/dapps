import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Alert,
    FormControl,
    InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    Stack,
    TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {burnStcToken} from "../../../utils/stcWalletSdk";

export default function Burn() {
    const {t} = useTranslation();
    const [token, setToken] = useState("0x00000000000000000000000000000001::STC::STC")
    const [tokenList] = useState<string[]>(["0x00000000000000000000000000000001::STC::STC"])
    const handleChangeToken = (event: SelectChangeEvent) => {
        setToken(event.target.value as string);
    };

    const handleBurn = async () => {
        await burnStcToken()
    }

    return <>
        <Card>
            <CardContent>
                <Stack spacing={2}>

                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Token</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={token}
                                label="Token"
                                onChange={handleChangeToken}
                            >
                                {tokenList.map((item, index) => {
                                    return <MenuItem key={item} selected={index === 0} value={item}>{item}</MenuItem>
                                })}

                            </Select>
                        </FormControl>
                    </Box>

                    <Alert severity="error">
                        {t("burn_token.burn_alert")}
                    </Alert>

                </Stack>

            </CardContent>

            <CardActions>
                <Button variant="contained" color="error" fullWidth onClick={handleBurn}>{t("burn_token.burn")}</Button>
            </CardActions>
        </Card>
    </>
}