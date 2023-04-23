import { FunctionComponent } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type Props = {
    name: string
    multiplier: number
}
const PlayerItem: FunctionComponent<Props> = ({ name, multiplier }) => {
    return (
        <ListItem dense>
            <ListItemText
                primary={name}
            />
            <ListItemText
                secondary={multiplier}
            />
        </ListItem>
    )
}
export default PlayerItem