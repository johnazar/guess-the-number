import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react'
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Chat from '@/components/Chat';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type Player = {
  id: number
  name: string
  multiplier: number
  pass?: boolean
}

export default function mui() {
  // Points
  const [points, setPoints] = useState<number>(100)
  // Player and playerlist
  const [myplayer, setPlayer] = useState<Player>({ id: 5, name: '', multiplier: 0, pass: false })
  const [playerList, setPlayerList] = useState<Player[]>([
    { id: 1, name: 'cpu1', multiplier: 7.53, pass: false },
    { id: 2, name: 'cpu2', multiplier: 1.24, pass: false },
    { id: 3, name: 'cpu3', multiplier: 6.84, pass: false },
    { id: 4, name: 'cpu4', multiplier: 9.75, pass: false },
  ])
  const [target, setTarget] = useState<number>(0)
  // save player name
  const [nameSaved, setIsSaving] = useState<boolean>(false)
  // start game
  const [isStart, setIsStart] = useState<boolean>(false)

  // player setup
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setPlayer(myplayer => ({
      ...myplayer,
      name: event.target.value
    }));
  }
  const handleMultiplierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value

    if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setPlayer(myplayer => ({
        ...myplayer,
        multiplier: Number(input)
      }));
    }
  }

  const handlePointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(
      Number(event.target.value)
    );
  }

  const handleSaveName = () => {
    console.log(`Saving name: ${myplayer.name}`)
    setIsSaving(true)
  }
  // game setup
  const handleStartGame = () => {
    console.log(`Game started`)
    let newPlayerList = [myplayer, ...playerList]
    setPlayerList(newPlayerList);
    setIsStart(true)
    const theTarget = Math.round(Math.random() * 1000) / 100
    setTarget(theTarget)
    handleResult(newPlayerList, theTarget)
  }

  //evaluate result
  const handleResult = (playerList: Player[], target: number) => {
    playerList.forEach((player) => player.pass = player.multiplier <= target ? true : false)
  }

  return (
    <Container sx={{ display: 'flex', height: '100vh', width: '100', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2} xs={12}>
        <Grid xs={6}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.paper',
            height: '100%',
            minHeight: 500,
            width: '100',
            minWidth: 100,
            justifyContent: 'center'
          }}>

            {
              nameSaved ?
                <Grid container xs={12}>
                  <Grid xs={6}>
                    <Container>
                      Points
                      <input
                        type="number"
                        value={points}
                        min={0}
                        onChange={handlePointChange}
                        className="text-black border border-gray-500 py-2 px-4 rounded focus:ring-blue-200"
                        disabled={isStart}
                      />
                    </Container>
                  </Grid>
                  <Grid xs={6}>
                    <Container>
                      Multiplier
                      <input
                        type='number'
                        min={0}
                        onChange={handleMultiplierChange}
                        className="text-black border border-gray-500 py-2 px-4 rounded focus:ring-blue-200"
                        disabled={isStart}
                      />
                    </Container>
                  </Grid>
                  <Grid xs={12} className='p-4'>
                    <Typography variant="h6" component="h6" gutterBottom>
                      Current Round
                    </Typography>
                    <Container sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                      {/* players list */}
                      <List dense>
                        <ListItem >
                          <ListItemText
                            className='pr-6'
                            primary='Name'
                          />
                          <ListItemText
                            className='pr-6'
                            primary='Score'
                          />
                          <ListItemText
                            primary='Multiplier'
                          />
                        </ListItem>
                        {
                          playerList.map(player => (
                            <ListItem key={player.id} className={`${player.pass ? 'bg-green-500' : ''}`}>
                              <ListItemText
                                className='pr-6'
                                primary={player.name}
                              />
                              <ListItemText
                                className='pr-6'
                                secondary={isStart ? Math.round(player.multiplier * points) : '-'}
                              />
                              <ListItemText
                                secondary={isStart ? player.multiplier : '-'}
                              />
                            </ListItem>
                          ))
                        }
                      </List>
                    </Container>
                  </Grid>
                  <Grid xs={12}>
                    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        className="text-white bg-green-500 font-bold py-2 px-4 my-4 rounded hover:bg-green-700 disabled:bg-gray-500"
                        disabled={(points <= 0) || isStart || (myplayer.multiplier <= 0)}
                        onClick={handleStartGame}
                      >
                        Start
                      </button>
                    </Container>
                  </Grid>
                </Grid>
                :
                <Grid sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }} >
                  <Typography variant="h4" component="h2" gutterBottom>
                    Welcome
                  </Typography>
                  <input
                    type="text"
                    className="text-black border border-gray-500 py-2 px-4 my-4 rounded focus:ring-blue-200"
                    placeholder="Enter you name"
                    readOnly={nameSaved}
                    onChange={handleNameChange}

                  />
                  <button
                    className="text-white bg-green-500 font-bold py-2 px-4 my-4 rounded hover:bg-green-700 disabled:bg-gray-500"
                    disabled={myplayer.name.length < 4 || nameSaved}
                    onClick={handleSaveName}
                  >
                    {nameSaved ? 'Saved' : 'Accept'}
                  </button>
                </Grid>
            }
          </Box>
        </Grid>
        <Grid container xs={6}>
          <Grid xs={4}>
            <Item>
              <ListItem dense>
                <ListItemIcon>
                  <WorkspacePremiumIcon />
                </ListItemIcon>
                <ListItemText
                  secondary={nameSaved ? '1,000' : ' '}
                />
              </ListItem>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <ListItem dense>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  secondary={nameSaved ? myplayer.name : ' '}
                />
              </ListItem>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <ListItem dense>
                <ListItemIcon>
                  <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText
                  secondary={nameSaved ? '21:30' : ' '}
                />
              </ListItem>
            </Item>
          </Grid>
          <Grid xs={12}>

            <Item>Charts goes here
              <br />
              The target: {target}</Item>
          </Grid>
        </Grid>
        <Grid xs={6}>
          Ranking
          <Item>Ranking goes here</Item>
        </Grid>
        <Grid xs={6}>
          Chat
          <Item>

            <Chat />
          </Item>
        </Grid>
      </Grid >

    </Container >
  )
}
