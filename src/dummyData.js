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


    reviews: [
        {
            id: 1,
            author: 1,
            placeId: 'ck6cpc6a100003h5qu7jor4kf',
            placeName: "Honeydew",
            placeCity: 'Lakeview',
            attributes: ["contactless", "good vibes"],
            addtionalComments: 'Great atmosphere!',
        },
        {
            id: 2,
            author: 1,
            placeId: 'ck6cpc6a100003h5qu7jor4kf',
            placeName: "Etta",
            placeCity: 'Wicker Park',
            attributes: ["Outdoor patio", "Great wine selection"],
            addtionalComments: 'Great service!',
        }
    ]
}
export default STORE;