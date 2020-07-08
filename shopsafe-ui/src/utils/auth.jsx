export  const getUserDetails = () => {
    const data={
        name:"John Doe",
        email:"abcdjohn@yahoo.com",
        phoneNumber:"+91 9452656726",
        imageUrl:"https://picsum.photos/554",
        address:"1600 Amphitheatre Parkway in Mountain View, California, United States",
    };
    return data;
};

export const ShopsList = (uid="-1") => {
    const shopList = [
        {
            uid:"123",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/355",
            itemsAvailable:["Electronics","Grocery"],
            ratings:4.1,
            
        },
        {
            uid:"124",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/340",
            itemsAvailable:["Electronics","Grocery"],
            ratings:3.1,
            
        },
        {
            uid:"125",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/348",
            itemsAvailable:["Electronics","Grocery"],
            ratings:3.6,
            
        },
        {
            uid:"126",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/320",
            itemsAvailable:["Electronics","Grocery"],
            ratings:2.3,
            
        },
        {
            uid:"127",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/389",
            itemsAvailable:["Electronics","Grocery"],
            ratings:3.7,
            
        },
        {
            uid:"128",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/337",
            itemsAvailable:["Electronics","Grocery"],
            ratings:4.6,
            
        },
        {
            uid:"129",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/350",
            itemsAvailable:["Electronics","Grocery"],
            ratings:1.8,
            
        },
        {
            uid:"130",
            email:"abcdjohn@vmart.com",
            phoneNumber:"+91 8752756676",
            openingTime:"10:00am",
            closingTime:"8:00pm",
            name:"New VMart Shopping Mall",
            address:"325, Sarat Chatterjee Road, Shibpur, Howrah-711102",
            imgUrl:"https://picsum.photos/350",
            itemsAvailable:["Electronics","Grocery"],
            ratings:1.8,
            
        }
    ];
    if(uid==="-1") return shopList;
    else return shopList.filter(item => item.uid===uid)[0];
}
 
