
import {useForm} from 'react-hook-form'
import {DevTool} from "@hookform/devtools"

let renderCount = 0

     type FormValues = {
     username : string
     email : string
     channel : string
     }

export const YoutubeForm = () => {
    const form = useForm<FormValues>({
     defaultValues: {
          username: "Rose",
          email : "",
          channel : "",
     }
    });
    const { register, control, handleSubmit, formState} = form
    const {errors} = formState;

    const onSubmit =(data: FormValues) => {
        console.log("form submitted", data)

    }
    renderCount++
  return (
    <div>
        <h1>YoutubeForm (renderCount/2)</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-md mx-auto mt-8">
       <div>
        <label htmlFor='username' className="block mb-2">UserName</label>
        <input 
        type='text' 
        id='username'
        {...register('username', {
           required: "username is required",
        })} className="border rounded-md p-2 mb-4" />
         
         <p className="text-red-500 text-sm text-left">{errors.username?.message}</p>
   </div>
        <div>
     <label htmlFor='email' className="block mb-2">E-mail</label>
     <input 
      type='email' 
     id='email'
     {...register('email',{
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid Format",
      },
     
      validate: {
          notAdmin: (fieldValue) => {
               return (fieldValue !== "admin@example.com" ||
               "Enter a different email address"
               );
           },
           notBackListed: (fieldValue) => {
               return !fieldValue.endsWith("baddomain.com") || "this domain is not supported "
           }
      }
     })}
    className="border rounded-md p-2 mb-4" />
     {errors.email && <p className="text-red-500 text-sm text-left">{errors.email.message}</p>}
   </div>

   <div>
  <label htmlFor='channel' className="block mb-2">Channel</label>
  <input 
    type='text' 
    id='channel'
    {...register('channel',{
      required:"channel is required"
    })}
    className="border rounded-md p-2 mb-4" />
  {errors.channel && <p className="text-red-500 text-sm text-left">{errors.channel.message}</p>}
</div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
      <DevTool control={control}/>
    </div>
  )
}

export default YoutubeForm
