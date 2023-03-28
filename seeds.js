var mongoose = require("mongoose");
var Fighter = require("./models/fighter");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Jon Jones",
        image: "https://www.hindustantimes.com/ht-img/img/2023/03/07/550x309/Jon_Jones_1677995551188_1678149025883_1678149025883.jpg",
        shortDescription: "Youngest UFC Champion in history. Undefeated.",
        wins: 23,
        losses: 0,
        draws: 1,
        noContests: 0,
        dateOfBirth: Date.now(),
        activeSince: Date.now(),
        weight: 205,
        height: 6.4,
        living: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Jose Aldo",
        image: "https://tatame.com.br/wp-content/uploads/2018/09/1006911760-612x612.jpg",
        shortDescription: "Undefeated for over 10 years in the Featherweight Division.",
        wins: 23,
        losses: 0,
        draws: 1,
        noContests: 0,
        dateOfBirth: Date.now(),
        activeSince: Date.now(),
        weight: 205,
        height: 6.4,
        living: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Khabib Nurmagomedov",
        image: "https://www.thesun.co.uk/wp-content/uploads/2019/09/NINTCHDBPICT000519327073-1-e1567778072527.jpg?w=1240",
        shortDescription: "Undefeated. Retired 29-0.",
        wins: 23,
        losses: 0,
        draws: 1,
        noContests: 0,
        dateOfBirth: Date.now(),
        activeSince: Date.now(),
        weight: 205,
        height: 6.4,
        living: true,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDB(){
   //Remove all fighters
   Fighter.remove({}, function(err)
   {
        if(err)
        {
            console.log(err);
        }

        console.log("removed fighters!");

        Comment.remove({}, function(err) 
        {
            if(err)
            {
                console.log(err);
            }

            console.log("removed comments!");
             //add a few fighters
            data.forEach(function(seed)
            {
                Fighter.create(seed, function(err, fighter)
                {
                    if (err)
                    {
                        console.log(err)
                    } 
                    else 
                    {
                        console.log("added a fighter");
                        //create a comment
                        Comment.create(
                            {
                                text: "BAD TAKE. HE TOOK DRUGS.",
                                author: "MMA_GUY_1990"
                            }, function(err, comment)
                            {
                                if(err)
                                {
                                    console.log(err);
                                } 
                                else 
                                {
                                    fighter.comments.push(comment);
                                    fighter.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
