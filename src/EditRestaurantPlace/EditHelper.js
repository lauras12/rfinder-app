
//edit resturants ottributes
const findObjects = {
     'Good vibes': 1, 
     'Great Wine selection': 2 ,
     'Awesome service': 3 ,
     'Contactless': 4,
     'Recycle and compost bins inside': 5 ,
     'Clean bathrooms': 6 ,
     'Good Beer selection': 7 ,
     'Gluten Free menu': 8 ,
     'Locally sourced produce': 9 ,
     'Organic produce': 10 ,
     'Games to play': 11 ,
     'Outdoor patio': 12 ,
     'Great for groups': 13 ,
     'Private event space': 14 ,
}




const EditHelper = {
changeFindIntoNUM: (finds) => {
        let finalFindList = [];
        finds.forEach(find => {
            for(let [key,value] of Object.entries(findObjects)){
                if(key === find) {
                    finalFindList.push(value)
                } 
            }
        })
        
        return finalFindList;
    }
}

export default EditHelper;