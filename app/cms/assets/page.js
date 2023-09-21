"use client";
import Cms from "@/components/Cms";
import Panel from "@/components/Panel";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import moment from "moment";
import Link from "next/link";

const api_url = process.env.server;

function Assets() {
  const { data: session } = useSession();
  const [assets, setAssets] = useState([]);
  const [uid, setUid] = useState(true);
  const selectUid = (uid) => {
    setUid(uid);
    document.getElementById(`btn_${uid}`).innerHTML = 'Pulling...';
    document.getElementById(`btn_${uid}`).disabled = true;
    document.getElementById(`total_${uid}`).innerHTML = '-';
    pullData(uid)
  }
  const pullData = async (uid) => {
    const resp = await fetch(process.env.server + `/assets/pull/${uid}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`
      }
    })
    const data = await resp.json()
    document.getElementById(`total_${data['uid']}`).innerHTML = data['total']
    document.getElementById(`btn_${data['uid']}`).disabled = false;
    document.getElementById(`btn_${data['uid']}`).innerHTML = 'Pull';
  }
  useEffect(() => {
    var arrResult = [];
    if (session) {
      async function getTotal(uid) {
        try {
          const resp = await fetch(api_url + "/assets/total/" + uid, {
            headers: {
              Authorization: `Bearer ${session.jwt}`,
            },  
          });
          const data = await resp.json();
          return data;
        } catch {
          return 0;
        }
      }

      async function getAssets() {
        const resp = await fetch(api_url + "/assets", {
          headers: {
            Authorization: `Bearer ${session.jwt}`,
          },
        });
        const data = await resp.json();
        let hasil = data["results"];
        var arr = {};
        hasil.forEach((item) => {
          arr["result"] = item;
          arr["local"] = getTotal(item["uid"]);
          arrResult.push(arr);
        });
        setAssets(arrResult);
      }
      getAssets();
    }
  }, [session]);
  return (
    <Cms title="Assets">
      <Panel>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Last Modified</TableCell>
                <TableCell>Submissions</TableCell>
                <TableCell>Local Subs.</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.map((item, index) => (
                <TableRow key={index}>
                  <TableCell><Link underline="none" href={`/cms/assets/${item.result.uid}`}>{item.result.name}</Link></TableCell>
                  <TableCell>{moment(item.result.date_created).format('LL')}</TableCell>
                  <TableCell>{moment(item.result.date_modified).format('LL')}</TableCell>
                  <TableCell>{item.result.deployment__submission_count}</TableCell>
                  <TableCell id={`total_${item.result.uid}`}>{item.local}</TableCell>
                  <TableCell>
                    <Button variant="contained" id={`btn_${item.result.uid}`} className="rounded-full" onClick={() => selectUid(item.result.uid)}>Pull</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Panel>
    </Cms>
  );
}

export default Assets;
