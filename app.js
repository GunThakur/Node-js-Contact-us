const {MongoClient } = require('mongodb')

async function main(){
    const uri ="mongodb+srv://ggun4535:gun@cluster0.7fcsaav.mongodb.net/";

    const User = new MongoClient(uri)
    try{
        await User.connect();
        // ** Create
        // await createMultipleListing(User,[
        //     {
                
        //         name:"Gun Rover",
        //         phone:"5439385954",
        //         email:"gunrover@gmail.com",
        //         message:"Hello World"

        //     },
        //     {
                
        //         name:"Jadev Tripathi",
        //         phone:"5479385954",
        //         email:"gunrover@gmail.com",
        //         message:"I am in this World"

        //     }
        // ])

        // ** Read
        // await findOneListingByName(User , "Jadev Tripathi")
        // await findAllListings(User)

        // **Update
        // await updateListingByName(User,"Jadev Tripathi",{message:"Hello World",name:"Jaidev Tripathi"})

        // **Delete
        // await deleteListingByName(User, "Gun Rover")
    }
    catch(err){
        console.error(err);
    }finally{
        await User.close()
    }
}

main().catch(console.error)

async function deleteListingByName(User, nameOfListing){
    const result = await User.db("Contact-Us").collection("Contact").deleteOne({name:nameOfListing});
    console.log(`${result.deletedCount} document(s) was/were deleted`)

}


async function updateListingByName(User, nameOfListing, updatedListing){
    const result = await User.db("Contact-Us").collection("Contact").updateOne({name:nameOfListing},{$set:updatedListing});
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} documents was/were updated`)
}



async function findAllListings(User) {
    const cursor = User.db("Contact-Us").collection("Contact").find();
    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found ${results.length} listings in the collection:`);
        console.log(results);
    } else {
        console.log(`No listings found in the collection.`);
    }
}

async function findOneListingByName(User, nameOfListing){
    const result = await User.db('Contact-Us').collection('Contact').findOne({name:nameOfListing})

    if (result){
        console.log(`Found a listing in the collection with the name ${nameOfListing}`)
        console.log(result)
    }
    else{
        console.log(`No Listing found with the name ${nameOfListing}`)
    }
}



async function createMultipleListing(User,newListings){
    const result = await User.db("Contact-Us").collection("Contact").insertMany(newListings)  
    console.log(`${result.insertedCount} new listings created with the following ids:`)
    console.log(result.insertedIds)
}


async function createListing(User, newListing){
    const result = await User.db("Contact-Us").collection("Contact").insertOne(newListing)  
    console.log(`New listing Created with the following id ${result.insertedId};`)
}   

async function listDatabases(User){
    const DatabasesList = await User.db().admin().listDatabases();



    console.log("Databases");
    DatabasesList.databases.forEach(db => {
        console.log(`${db.name}`)
    });
}
