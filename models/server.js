
const grpc = require('@grpc/grpc-js');
const protoPath = "./proto/news.proto";
var protoLoader = require('@grpc/proto-loader');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

 

class Server {

    constructor() {

        this.packageDefinition = protoLoader.loadSync(protoPath, options);
        this.newsProto = grpc.loadPackageDefinition(this.packageDefinition);
        this.server = new grpc.Server();
        this.port = process.env.PORT;

        this.server.addService(this.newsProto.NewsService.service, {
            getAllNews: (_, callback) => {
                callback(null, news);
            }
        })
 
    }


    listen() {
        this.server.bindAsync(process.env.SERVER_ADDRESS, 
            grpc.ServerCredentials.createInsecure(), 
            (error, port) => {
                if (error != null) {
                    return console.log(error);
                }
                console.log(`Server Running at ${process.env.SERVER_ADDRESS}`);
                this.server.start();
            }
        );

        
    }
}

module.exports = Server