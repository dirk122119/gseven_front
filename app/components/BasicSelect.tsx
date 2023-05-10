import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BasicTable from './Basictable';
import TextField from '@mui/material/TextField';

interface Props {
    token: string
}



export default function BasicSelect(props: Props) {
    const [catagory, setCatagory] = React.useState("0");
    const [catagories, setCatagories] = React.useState([]);
    const [items,setItems]= React.useState([]);
    const [message, setMessage] = React.useState('');
    const [resultMessage,setResultMessage] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCatagory(event.target.value as string);
        let index:number=Number(event.target.value)
        if(index-1>=0){
            getItemsByCatagory(catagories[index-1])
        }
        else{
            getAllItems()
        }
        
    };

    const getCatagories= async()=>{
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${props.token}`);
        let getRequestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
       await fetch("https://35.76.111.9/items/catagories", getRequestOptions)
            .then(response => response.json())
            .then(result => {
                setCatagories(result)
            }
                )
            .catch(error => console.log('error', error));
        
    }

    const getAllItems= async()=>{
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${props.token}`);
        let getRequestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        await fetch("https://35.76.111.9/items", getRequestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
                if(result["detail"]=="Item not found"){
                    setResultMessage("找不到商品")
                }
            }
                )
            .catch(error => console.log('error', error));
    }


    const getItemsByCatagory = async(value:string)=>{
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${props.token}`);
        let getRequestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        await fetch(`https://35.76.111.9/items/search/item_cata?cata=${value}`, getRequestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
                if(result["detail"]=="Item not found"){
                    setResultMessage("找不到商品")
                }
            })
            .catch(error => console.log('error', error));
    }

    const getItemsBySearch = async(value:string)=>{
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${props.token}`);
        let getRequestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        await fetch(`https://35.76.111.9/items/search?item=${value}`, getRequestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
                if(result["detail"]=="Item not found"){
                    setResultMessage("找不到商品")
                }
            })
            .catch(error => console.log('error', error));
    }

    const handleKeyPress=(data: any) => {
        if (data.charCode === 13) {
            getItemsBySearch(message)
        }
      }

    const handleTextfieldChange = (event:any) => {
        setMessage(event.target.value);
      };

    React.useEffect(() => {
        if(props.token){
        getCatagories();
        getAllItems();
    }
      }, [props.token]);


    return (
        <>
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{width:"12vw",paddingRight:"10px"}}>
                <InputLabel id="demo-simple-select-label">Catagories</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={catagory}
                    label="catagory"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>All</MenuItem>
                {
                catagories.length>0 && catagories.map((category,index)=>{return <MenuItem key={index+1} value={index+1}>{category}</MenuItem>})
                }

                </Select>
            </FormControl>

            <TextField id="outlined-basic" label="Search" variant="outlined" onKeyPress={handleKeyPress} onChange={handleTextfieldChange}/>
        </Box>
       {  items.length>0
       ?
        <Box sx={{paddingTop:"50px"}}>
            <BasicTable items={items}/>
        </Box>
        :<h1>{resultMessage}</h1>
        }
        </>
    );
}