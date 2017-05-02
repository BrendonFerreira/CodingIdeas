
Users().create({name: "Silva World da silva", age: "21"}).then( (response) => { 
    Users().create({name: "Hello World da silva", age: "23"}).then( (response) => { 
        Users().create({name: "Pereira World da silva", age: "18"}).then( (response) => { 
            Users().create({name: "World da silva", age: "30"}).then( (response) => { 
                Users().create({name: "Tux World da silva", age: "19"}).then( (response) => { 
                    Users().create({name: "World da Silva World da silva", age: "29"}).then( (response) => { 
                        Users().create({name: "XPTO World da silva", age: "31"}).then( (response) => { 
                            Posts().create({title: "Hello World", content: "This is my first post"}).then( (response) => { 
                                Users().index().then(console.log)
                            })
                        })
                    })
                })
            })
        })
    })
})      