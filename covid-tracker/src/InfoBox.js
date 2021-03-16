import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import "./InfoBox.css"
function InfoBox({active, title , cases , total , className, ...props}) {
    return (
        <Card className =  {`infoBox ${active && "infoBox--selected"}`}                            
            //
        onClick = {props.onClick}>
            <CardContent>
                <Typography className = "Infobox_title" color = "textSecondary">
                    {title} 
                </Typography>
                <h2 className = "Infobox_cases">{cases} </h2>
                <Typography  className = "Infobox_total" color = "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
