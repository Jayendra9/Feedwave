import { Button } from "./ui/button"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import tailwindStyles from "../index.css?inline";
import supabase  from "../supabaseClient" 

export const Widget = ({ projectId }) => {

    const [rating, setRating] = useState(3);
    const [submitted, setSubmitted] = useState(false);

    const onSelectStar = (index) => {
        setRating(index+1);
    }

    const submit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            p_project_id: projectId, 
            p_user_name: form.name.value,
            p_user_email: form.email.value,
            p_message: form.feedback.value,
            p_rating: rating,
        };
        const { data: returnedData, error } = await supabase.rpc("add_feedback", data);
        setSubmitted(true);
        console.log(returnedData);
    }

    return <>
    <style>{tailwindStyles}</style>
    <div className="widget fixed bottom-4 right-4 z-50">
        <Popover>
            <PopoverTrigger asChild>
                <Button className="rounded-full shadow-xl  hover:scale-105 transition-all ">
                    Feedback
                    <MessageCircleIcon className="ml-2 h-5 w-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="widget rounded-lg bg-card p-4 shadpw-lg w-full max-w-md">
                <style>{tailwindStyles}</style>
                {submitted ? (<div>
                    <h3 className="text-lg font-semibold">Thank you for your feedback!</h3>
                    <p className="mt-4">We appreciate your 
                    feedback. It helps us improve our product and 
                    provide better service to our customers. </p>
                </div>) : <div>
                    <h3 className="text-lg font-bold">Send us your feedback</h3>
                    <form className="space-y-2" onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name"></Input>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea id="feedback" placeholder="Tell us what you think" className="min-h-[100px]"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        className={`h-7 w-7 cursor-pointer ${
                                            rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"}`
                                        }
                                        onClick={() => {onSelectStar(index)}}
                                    />
                                ))}
                            </div>
                            <Button type="submit ">Submit</Button>
                        </div>
                    </form>
                </div>}
            </PopoverContent>
        </Popover>
    </div>
    </>
}

function StarIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
    )
}

function MessageCircleIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>

    )
}

