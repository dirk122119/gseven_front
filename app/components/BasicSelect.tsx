import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BasicTable from './Basictable';

interface Props {
    token: string
}
interface Data {
    content: string;
}

interface Items{
    ITEM_CATA:string;
    ITEM_DESC:string;
    ITEM_ID:string;
    ITEM_MODEL:string;
    ITEM_PRICE:number;
}


export default function BasicSelect(props: Props) {
    const [catagory, setCatagory] = React.useState("0");
    const [catagories, setCatagories] = React.useState<Array<Items>>([]);
    const [items,setItems]= React.useState<Array<Data>>([]);
    const handleChange = (event: SelectChangeEvent) => {
        setCatagory(event.target.value as string);
        if(event.target.value-1>=0){
            getItemsByCatagory(catagories[event.target.value-1])
        }
        
    };
    const getCatagories= async()=>{
        let myHeaders = new Headers();

        myHeaders.append("Authorization", `Bearer ${props.token}`);
        let getRequestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
       await fetch("http://35.76.111.9/items/catagories", getRequestOptions)
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
        await fetch("http://35.76.111.9/items", getRequestOptions)
            .then(response => response.json())
            .then(result => {
                setItems(result)
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
        await fetch(`http://35.76.111.9/items/search/item_cata?cata=${value}`, getRequestOptions)
            .then(response => response.json())
            .then(result => setItems(result))
            .catch(error => console.log('error', error));
    }


    React.useEffect(() => {
        getCatagories();
        getAllItems();
      }, [props.token]);


    return (
        <>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
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
        </Box>
       {  items.length>0 &&
        <Box sx={{paddingTop:"50px"}}>
            <BasicTable items={items}/>
        </Box>
        }
        </>
    );
}