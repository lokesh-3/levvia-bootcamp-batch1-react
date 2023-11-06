interface IProfile{
    content:String
    }
    
    export const Profile = (props:IProfile) => {
        return (
        <>
        {/* TODO Need to add css */}
        <div className="border-2 w-16 h-16">
    
        </div>
        <h3>{props.content}</h3>
        </>
        );
    };
    
    