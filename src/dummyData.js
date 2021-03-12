const STORE = {
    users: [
        {
            id: 1,
            reviewsIds: [1, 3],
        }
    ],
    
    folders: [
        {
            folderId: 1,
            author: 1,
            title: 'favorites',
            savedPlacesIds: []
        }
    ],
    
    
    reviews : [
        {
            id: 1,
            author: 1,
            placeId: 'ck6cpc6a100003h5qu7jor4kf',
            placeName:  "Sienna",
            placeCity: 'Condado',
            attributes: ["contactless", "drinks"],
            addtionalComments: 'Great vibe!',
        },
        {
            id: 2,
            author: 1,
            placeId: 'ck6cpc6a100003h5qu7jor4kf',
            placeName:  "Cayo Caribe",
            placeCity: 'Chicao',
            attributes: ["no-plastic", "food", "contactless"],
            addtionalComments: 'Great atmosphere!',
        }
    ]
    }
    export default STORE;
    